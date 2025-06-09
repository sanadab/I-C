import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';
import Spacer from '../components/Spacer';
import Navbar from '../components/Navbar2';
import Icon from 'react-native-vector-icons/Feather';

const CounselorInboxScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSeekers, setFilteredSeekers] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await trackerApi.get('/messages/conversations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobSeekers(response.data);
        setFilteredSeekers(response.data);
      } catch (err) {
        console.error('Error fetching conversation list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = query
      ? jobSeekers.filter((seeker) =>
          seeker.fullname.toLowerCase().includes(query.toLowerCase())
        )
      : jobSeekers;

    setFilteredSeekers(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#034694" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <Spacer />
      <Navbar navigation={navigation} />
      <FlatList
        data={filteredSeekers}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <Spacer />
            <Text style={styles.title}>Messages</Text>
            <Spacer></Spacer>

            <View style={styles.searchWrapper}>
              <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name"
                value={searchQuery}
                onChangeText={handleSearch}
                placeholderTextColor="#999"
              />
            </View>
          </>
        }
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
            <View style={styles.nameRow}>
              <Icon name="user" size={20} color="#034694" style={styles.userIcon} />
              <Text style={styles.name}>{item.fullname}</Text>
            </View>
            <Text style={styles.subtext}>Tap to view conversation</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
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
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  searchWrapper: {
    position: 'relative',
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  searchIcon: {
    position: 'absolute',
    top: 14,
    left: 30,
    zIndex: 1,
  },
  searchInput: {
    height: 48,
    paddingLeft: 44,
    paddingRight: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#4F84C4',
    elevation: 3,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  subtext: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
});

export default CounselorInboxScreen;
