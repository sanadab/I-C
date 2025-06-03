import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CounselorInboxScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [jobSeekers, setJobSeekers] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await trackerApi.get('/messages/conversations', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJobSeekers(response.data);
      } catch (err) {
        console.error('Error fetching conversation list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Seekers Who Contacted You</Text>
      <FlatList
        data={jobSeekers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('CounselorChatScreen', {
                jobSeekerId: item._id,
                jobSeekerName: item.fullname
              })
            }
          >
            <Text style={styles.name}>{item.fullname}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 18,
  },
});

export default CounselorInboxScreen;
