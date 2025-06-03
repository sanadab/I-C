// === ✅ CCDetails.js (Frontend - fixed) ===
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import trackerApi from '../api/tracker';

const CCDetails = () => {
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
    if (course.trim()) {
      setCourses([...courses, course.trim()]);
      setCourse('');
    }
  };

  const handleAddTestimonial = () => {
    if (testimonial.trim()) {
      setTestimonials([...testimonials, testimonial.trim()]);
      setTestimonial('');
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await trackerApi.post(
        '/Details',
        { expertise, courses, testimonials },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Success', 'Profile submitted successfully');
      setExpertise('');
      setCourses([]);
      setTestimonials([]);
    } catch (err) {
      console.error('Error submitting details:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Career Counselor Profile</Text>

      <Text style={styles.label}>Name</Text>
      <Text style={styles.nameText}>{name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Expertise"
        value={expertise}
        onChangeText={setExpertise}
      />

      <Text style={styles.subheading}>Courses Offered</Text>
      <TextInput
        style={styles.input}
        placeholder="Add Course"
        value={course}
        onChangeText={setCourse}
      />
      <TouchableOpacity onPress={handleAddCourse} style={styles.button}>
        <Text style={styles.buttonText}>ADD COURSE</Text>
      </TouchableOpacity>

      <Text style={styles.subheading}>Testimonials</Text>
      <TextInput
        style={styles.input}
        placeholder="Add Testimonial"
        value={testimonial}
        onChangeText={setTestimonial}
      />
      <TouchableOpacity onPress={handleAddTestimonial} style={styles.button}>
        <Text style={styles.buttonText}>ADD TESTIMONIAL</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  },
  nameText: {
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5
  }
});

export default CCDetails;
