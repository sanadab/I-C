import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import Navbar from '../components/Navbar2';

const CareerCounselorProfile = ({ navigation }) => {
  return (
    <>
    <Spacer></Spacer>
    
      <Navbar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
  
          <Text style={styles.titleStyle}>Career Counselor</Text>
          <Text style={styles.subtitleStyle}>Empowering Future Tech Talent</Text>
          <Text style={styles.descriptionStyle}>
            As a dedicated career counselor, you play a pivotal role in preparing job seekers for the competitive tech industry.
            Your guidance equips them with both technical competencies and essential soft skills needed to excel in interviews and real-world job environments.
          </Text>

          <Text style={styles.subtitleStyle}>Core Areas of Guidance</Text>
          <Text style={styles.descriptionStyle}>
            In your sessions, you'll help candidates sharpen their abilities in:
            {'\n'}• Data Structures & Algorithms
            {'\n'}• System Design Fundamentals
            {'\n'}• Real-World Coding Challenges
            {'\n'}• Effective Communication & Team Collaboration
            {'\n'}• Interview Preparation & Mock Sessions
            {'\n'}• Time & Task Management Techniques
            {'\n'}• HR & Salary Negotiation Best Practices
          </Text>

          <Text style={styles.subtitleStyle}>Your Mission</Text>
          <Text style={styles.descriptionStyle}>
            Inspire and guide aspiring tech professionals by tailoring personalized development plans and building their confidence to succeed in a fast-paced digital world.
          </Text>
       
      </ScrollView>
    </>
  );
};

CareerCounselorProfile.navigationOptions = {
  headerLeft: null,
  headerTitle: null,
};

const styles = StyleSheet.create({
  titleStyle: {
    marginTop: 50,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitleStyle: {
    fontSize: 22,
    marginTop: 25,
    textAlign: 'center',
    color: '#3b3b3b',
    fontWeight: '600',
  },
  descriptionStyle: {
    marginTop: 15,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    paddingHorizontal: 15,
    color: '#444',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
});

export default CareerCounselorProfile;
