import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from '../components/Spacer';
import Navbar from '../components/Navbar2';

const CounselorInboxScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [jobSeekers, setJobSeekers] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await trackerApi.get('/messages/conversations', {
          headers: { Authorization: `Bearer ${token}` }
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
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#034694" />
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <Spacer />
      <Text style={styles.title}>Inbox</Text>
      <Spacer /><Spacer />
      <FlatList
        data={jobSeekers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('CounselorChat', {
                jobSeekerId: item._id,
                seekerName: item.fullname,
              })
            }
          >
            <Text style={styles.name}>{item.fullname}</Text>
            <Text style={styles.subtext}>Tap to view conversation</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
     marginTop: 20,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#034694',
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00000',
  },
  subtext: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
});

export default CounselorInboxScreen;
