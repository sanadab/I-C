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
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/Feather';

const JobSeekerInboxScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [counselors, setCounselors] = useState([]);
  const [filteredCounselors, setFilteredCounselors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token');

        const response = await trackerApi.get('/messages/conversations', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCounselors(response.data);
        setFilteredCounselors(response.data);
      } catch (err) {
        console.error('Error loading conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = query
      ? counselors.filter((c) =>
          c.fullname.toLowerCase().includes(query.toLowerCase())
        )
      : counselors;

    setFilteredCounselors(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#034694" />
      </View>
    );
  }

  return (
    <>
      <Spacer />
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        <Spacer />

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search counselor by name"
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
        </View>

        <Spacer />
        <FlatList
          data={filteredCounselors}
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
              <View style={styles.nameRow}>
                <Icon name="user" size={20} color="#034694" style={styles.userIcon} />
                <Text style={styles.name}>{item.fullname}</Text>
              </View>
              <Text style={styles.subtext}>Tap to view conversation</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </>
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
    marginTop: -5,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  searchWrapper: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 20,
  },
  searchIcon: {
    position: 'absolute',
    top: 14,
    left: 14,
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
    color: '#000000',
  },
  subtext: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
});

export default JobSeekerInboxScreen;
