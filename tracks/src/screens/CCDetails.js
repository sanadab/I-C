import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';
import Spacer from '../components/Spacer';
import Navbar from '../components/Navbar2';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // optional

const CCDetails = ({ navigation }) => {
  const [expertise, setExpertise] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [testimonial, setTestimonial] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchName = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const response = await trackerApi.get('/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName(response.data.fullname);
    };
    fetchName();
  }, []);

  const handleAddCourse = () => {
    const trimmed = course.trim();
    if (trimmed && !courses.includes(trimmed)) {
      setCourses([...courses, trimmed]);
      setCourse('');
    } else if (courses.includes(trimmed)) {
      Alert.alert('Duplicate', 'Course already added.');
    }
  };

  const handleAddTestimonial = () => {
    const trimmed = testimonial.trim();
    if (trimmed && !testimonials.includes(trimmed)) {
      setTestimonials([...testimonials, trimmed]);
      setTestimonial('');
    } else if (testimonials.includes(trimmed)) {
      Alert.alert('Duplicate', 'Testimonial already added.');
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!expertise || courses.length === 0 || testimonials.length === 0) {
        Alert.alert('Incomplete', 'Please fill in all fields.');
        return;
      }

      await trackerApi.post(
        '/Details',
        { expertise, courses, testimonials },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Success', 'Profile submitted successfully!');
      setExpertise('');
      setCourses([]);
      setTestimonials([]);
    } catch (err) {
      console.error('Submission error:', err);
      Alert.alert('Error', 'Something went wrong while submitting.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Navbar navigation={navigation} />
      <Spacer />
      <Text style={styles.title}>Add Your Info</Text>
      <Spacer />

      <Text style={styles.label}>Major / Expertise</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Software Engineering, Cybersecurity"
        value={expertise}
        onChangeText={setExpertise}
        placeholderTextColor="#6c757d"
      />
      <Spacer></Spacer>
      <Text style={styles.label}>Courses Offered</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add a course"
          value={course}
          onChangeText={setCourse}
          placeholderTextColor="#6c757d"
        />
        
        <TouchableOpacity onPress={handleAddCourse} style={styles.iconButton}>
          {/* <Icon name="add" size={24} color="#fff" /> */}
          <Text style={styles.iconButtonText}>＋</Text>
        </TouchableOpacity>
        
      </View>
            <Spacer></Spacer>

      {courses.map((c, i) => (
        <Text key={i} style={styles.listItem}>• {c}</Text>
      ))}

      <Text style={styles.label}>Testimonials</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Add a testimonial"
          value={testimonial}
          onChangeText={setTestimonial}
          placeholderTextColor="#6c757d"
        />
        <TouchableOpacity onPress={handleAddTestimonial} style={styles.iconButton}>
          {/* <Icon name="add" size={24} color="#fff" /> */}
          <Text style={styles.iconButtonText}>＋</Text>
        </TouchableOpacity>
      </View>
      {testimonials.map((t, i) => (
        <Text key={i} style={styles.listItem}>• "{t}"</Text>
      ))}

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit Profile</Text>
      </TouchableOpacity>

      <Spacer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  title: {
    marginTop: 10,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconButton: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  iconButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -1,
  },
  listItem: {
    fontSize: 15,
    color: '#444',
    marginLeft: 10,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#034694',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default CCDetails;
