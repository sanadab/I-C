import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import Navbar from '../components/Navbar'; // ✅ Use shared Navbar

const UserProfile = ({ navigation }) => {
  return (
    <>
      <Navbar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Spacer>
          <Text style={styles.titleStyle}>Profile Page</Text>
          <Text style={styles.subtitleStyle}>What We Do</Text>
          <Text style={styles.descriptionStyle}>
            The technology and high-tech industry is constantly growing, and there is high competition in the job market today for tech roles, especially for developers, cyber professionals, and project managers...
          </Text>

          <Text style={styles.subtitleStyle}>Topics You Will Learn</Text>
          <Text style={styles.descriptionStyle}>
            In this app, you will be able to improve your technical and soft skills by practicing topics such as:
            {'\n'}- Data Structures (Arrays, Linked Lists, Trees, Graphs)
            {'\n'}- Algorithms (Sorting, Searching, Dynamic Programming)
            {'\n'}- System Design
            {'\n'}- Coding Challenges and Problem Solving
            {'\n'}- Soft Skills (Teamwork, Time Management, Communication)
            {'\n'}- Interview Techniques and Strategies
            {'\n'}- Negotiation Skills for HR Discussions
          </Text>
        </Spacer>
      </ScrollView>
    </>
  );
};

UserProfile.navigationOptions = {
  headerLeft: null,
  headerTitle: null,
};

const styles = StyleSheet.create({
  titleStyle: {
    marginTop: 50,
    fontSize: 48,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitleStyle: {
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
  descriptionStyle: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'left',
    padding: 10,
    color: 'black',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default UserProfile;
