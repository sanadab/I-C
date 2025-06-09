import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator,
  TouchableOpacity, TextInput,
} from 'react-native';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';
import Spacer from '../components/Spacer';
import Icon from 'react-native-vector-icons/Feather';

const PiccareerC = ({ navigation }) => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCounselors, setFilteredCounselors] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.warn('No token found');
          setLoading(false);
          return;
        }

        const response = await trackerApi.get('/details/all-counselors', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCounselors(response.data);
        setFilteredCounselors(response.data);
      } catch (err) {
        console.error('Failed to fetch details:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = query
      ? counselors.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.expertise.toLowerCase().includes(query.toLowerCase())
        )
      : counselors;

    setFilteredCounselors(filtered);
  };

  const handleChat = (counselorId, counselorName) => {
    navigation.navigate('ChatScreen', {
      counselorId,
      counselorName,
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      <Spacer />
      <Navbar navigation={navigation} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Career Counselors</Text>
      </View>

      {/* Updated Search UI */}
      <View style={styles.searchWrapper}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or expertise"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {filteredCounselors.length === 0 ? (
          <Text style={styles.errorText}>
            No counselors found matching your search criteria.
          </Text>
        ) : (
          filteredCounselors.map((counselor, index) => (
            <View key={counselor._id || index} style={styles.card}>
              <Text style={styles.header}>{counselor.name}</Text>
              <Text style={styles.subHeader}>Expertise:</Text>
              <Text style={styles.text}>{counselor.expertise}</Text>

              <Text style={styles.subHeader}>Courses:</Text>
              {counselor.courses.map((course, idx) => (
                <Text key={idx} style={styles.listItem}>• {course}</Text>
              ))}

              <Text style={styles.subHeader}>Testimonials:</Text>
              {counselor.testimonials.map((testimonial, idx) => (
                <View key={idx} style={styles.testimonialBox}>
                  <Text style={styles.text}>{testimonial}</Text>
                </View>
              ))}

              <TouchableOpacity
                style={styles.chatButton}
                onPress={() => handleChat(counselor.userId, counselor.name)}
              >
                <Text style={styles.chatButtonText}>Chat with Counselor</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#d9534f',
  },
  titleContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
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
    marginTop: 20,
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
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderLeftWidth: 5,
    borderLeftColor: '#4F84C4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
    textAlign: 'left',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  listItem: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 10,
    marginTop: 4,
  },
  testimonialBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#60a5fa',
  },
  chatButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#034694',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PiccareerC;
