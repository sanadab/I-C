import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const flatListRef = useRef(null);

  // Get parameters safely using getParam for React Navigation v5
  const counselorId = navigation.getParam('counselorId');
  const counselorName = navigation.getParam('counselorName');

  useEffect(() => {
    if (!counselorId) {
      setError('No counselor selected');
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      try {
        setError(null);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await trackerApi.get(`/messages/${counselorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Transform messages for the UI
        const formattedMessages = response.data.map(msg => ({
          id: msg._id,
          text: msg.text,
          sender: msg.sender === counselorId ? 'counselor' : 'me',
          createdAt: msg.createdAt
        }));
        
        setMessages(formattedMessages);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        setError('Failed to load messages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    
    // Set up polling for new messages (replace with WebSockets if possible)
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [counselorId]);

  const sendMessage = async () => {
    const messageText = newMessage.trim();
    if (!messageText || !counselorId) return;

    const tempId = Date.now().toString();
    let token;
    
    try {
      token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Optimistically add message to UI
      const optimisticMessage = {
        id: tempId,
        sender: 'me',
        text: messageText,
        createdAt: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, optimisticMessage]);
      setNewMessage('');
      
      // Send to server
      const response = await trackerApi.post(
        '/messages',
        {
          recipient: counselorId,
          text: messageText
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Replace temporary message with server response
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { 
          id: response.data._id,
          text: response.data.text,
          sender: 'me',
          createdAt: response.data.createdAt
        } : msg
      ));
      
    } catch (err) {
      console.error('Failed to send message:', err);
      // Remove optimistic message if failed
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      setError('Failed to send message. Please try again.');
    }
  };

  if (!counselorId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No counselor selected</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Text style={styles.header}>Chat with {counselorName}</Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBox,
            item.sender === 'me' ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timeText}>
              {new Date(item.createdAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          multiline
          blurOnSubmit={false}
        />
        <TouchableOpacity 
          onPress={sendMessage} 
          style={styles.sendButton}
          disabled={!newMessage.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  messageList: {
    paddingBottom: 16,
  },
  messageBox: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  theirMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    opacity: 1,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;