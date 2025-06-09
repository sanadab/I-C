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
        if (!token) throw new Error('No token found');

        const response = await trackerApi.get(`/messages/${counselorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const formatted = response.data.map(msg => ({
          id: msg._id,
          text: msg.text,
          sender: msg.sender === counselorId ? 'counselor' : 'me',
          createdAt: msg.createdAt
        }));

        setMessages(formatted);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
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
      if (!token) throw new Error('No token found');

      const optimisticMessage = {
        id: tempId,
        sender: 'me',
        text: messageText,
        createdAt: new Date().toISOString()
      };

      setMessages(prev => [...prev, optimisticMessage]);
      setNewMessage('');

      const response = await trackerApi.post('/messages', {
        recipient: counselorId,
        text: messageText
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempId
            ? { ...msg, id: response.data._id }
            : msg
        )
      );
    } catch (err) {
      console.error('Send failed:', err);
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      setError('Message not sent. Try again.');
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
      keyboardVerticalOffset={90}
    >
      <Text style={styles.header}>Chat with {counselorName}</Text>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBox,
              item.sender === 'me' ? styles.myMessage : styles.theirMessage
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
        )}
        keyExtractor={item => item.id}
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
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  errorBox: {
    backgroundColor: '#ffe6e6',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },
  messageList: {
    padding: 10,
  },
  messageBox: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#128C7E',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
