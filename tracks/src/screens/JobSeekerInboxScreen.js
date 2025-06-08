import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const JobSeekerInboxScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [counselors, setCounselors] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token');

        const response = await trackerApi.get('/messages/conversations', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCounselors(response.data);
      } catch (err) {
        console.error('Error loading conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats with Counselors</Text>
      <FlatList
        data={counselors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                counselorId: item._id,
                counselorName: item.fullname,
              })
            }
          >
            <View style={styles.row}>
              <Icon name="account-circle" size={24} color="#555" style={styles.icon} />
              <Text style={styles.name}>{item.fullname}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
});

export default JobSeekerInboxScreen;
