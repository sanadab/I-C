// === ✅ FIXED CounselorChatScreen.js ===
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';

const CounselorChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  const jobSeekerId = navigation.getParam('jobSeekerId');
  const jobSeekerName = navigation.getParam('jobSeekerName');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await trackerApi.get(`/messages/${jobSeekerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted = response.data.map(msg => ({
          id: msg._id,
          text: msg.text,
          sender: msg.sender === jobSeekerId ? 'seeker' : 'me',
          createdAt: msg.createdAt,
        }));

        setMessages(formatted);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [jobSeekerId]);

  const sendMessage = async () => {
    const messageText = newMessage.trim();
    if (!messageText) return;

    const tempId = Date.now().toString();
    setNewMessage('');

    try {
      const token = await AsyncStorage.getItem('token');

      setMessages(prev => [...prev, {
        id: tempId,
        text: messageText,
        sender: 'me',
        createdAt: new Date().toISOString(),
      }]);

      const response = await trackerApi.post('/messages', {
        recipient: jobSeekerId,
        text: messageText
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages(prev => prev.map(msg =>
        msg.id === tempId ? { ...msg, id: response.data._id } : msg
      ));
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

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
      <Text style={styles.header}>Chat {jobSeekerName}</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBox,
            item.sender === 'me' ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{
              new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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

export default CounselorChatScreen;