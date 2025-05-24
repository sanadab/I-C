import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import trackerApi from '../api/tracker';

const CounselorChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentConversation, setCurrentConversation] = useState(null);
  const flatListRef = useRef(null);
  const { state } = useAuth();
  const counselorId = state.userId;
  const jobSeekerId = navigation.getParam('jobSeekerId');
  const jobSeekerName = navigation.getParam('jobSeekerName');

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await trackerApi.get(`/messages/conversation/${counselorId}/${jobSeekerId}`);
        setMessages(response.data);
        setCurrentConversation(jobSeekerId);
      } catch (err) {
        console.error('Failed to fetch conversation:', err);
      }
    };

    fetchConversation();
    const interval = setInterval(fetchConversation, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [counselorId, jobSeekerId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await trackerApi.post('/messages/send', {
          senderId: counselorId,
          receiverId: jobSeekerId,
          content: newMessage
        });
        setNewMessage('');
        // Optimistically update UI
        setMessages(prev => [...prev, {
          _id: Date.now().toString(),
          sender: counselorId,
          receiver: jobSeekerId,
          content: newMessage,
          timestamp: new Date()
        }]);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      } catch (err) {
        console.error('Failed to send message:', err);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Text style={styles.header}>Chat with {jobSeekerName}</Text>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBox,
            item.sender === counselorId ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
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