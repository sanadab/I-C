import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Context as AuthContext } from '../context/AuthContext';
import { create } from "../models/Details";

const CCDetails = () => {
  const { state, Details } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [course, setCourse] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const userId = "your-user-id"; // Replace this with actual user ID

  const addCourse = () => {
    if (course.trim()) {
      setCourses([...courses, course]);
      setCourse("");
    }
  };

  const addTestimonial = () => {
    if (testimonial.trim()) {
      setTestimonials([...testimonials, testimonial]);
      setTestimonial("");
    }
  };

  const handleSubmit = () => {
    if (!name || !expertise) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    Details({ name, expertise, courses, testimonials });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Career Counselor Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Expertise"
        value={expertise}
        onChangeText={setExpertise}
      />

      <Text style={styles.sectionTitle}>Courses Offered</Text>
      <TextInput
        style={styles.input}
        placeholder="Add Course"
        value={course}
        onChangeText={setCourse}
      />
      <Button title="Add Course" onPress={addCourse} />
      <FlatList
        data={courses}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.sectionTitle}>Testimonials</Text>
      <TextInput
        style={styles.input}
        placeholder="Add Testimonial"
        value={testimonial}
        onChangeText={setTestimonial}
      />
      <Button title="Add Testimonial" onPress={addTestimonial} />
      <FlatList
        data={testimonials}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  listItem: {
    fontSize: 16,
    padding: 5,
  },
});

export default CCDetails;
