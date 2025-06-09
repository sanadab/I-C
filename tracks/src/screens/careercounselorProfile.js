import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import Navbar from '../components/Navbar2';
import Icon from 'react-native-vector-icons/Feather';

const CareerCounselorProfile = ({ navigation }) => {
  return (
    <>
      <Spacer />
      <Navbar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titleStyle}>Career Counselor</Text>
        <Text style={styles.subtitleStyle}>Empowering Future Tech Talent</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="briefcase" size={20} color="#034694" style={styles.icon} />
            <Text style={styles.sectionTitle}>Your Role</Text>
          </View>
          <Text style={styles.descriptionStyle}>
            As a dedicated career counselor, you guide job seekers to thrive in the competitive tech landscape. Your coaching empowers them with technical skills, soft skills, and the confidence to stand out in interviews and the workplace.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="compass" size={20} color="#034694" style={styles.icon} />
            <Text style={styles.sectionTitle}>Core Areas of Guidance</Text>
          </View>
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>• Data Structures & Algorithms</Text>
            <Text style={styles.bullet}>• System Design Fundamentals</Text>
            <Text style={styles.bullet}>• Real-World Coding Challenges</Text>
            <Text style={styles.bullet}>• Effective Communication & Teamwork</Text>
            <Text style={styles.bullet}>• Interview Preparation & Mock Sessions</Text>
            <Text style={styles.bullet}>• Time & Task Management Techniques</Text>
            <Text style={styles.bullet}>• HR & Salary Negotiation Tips</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="target" size={20} color="#034694" style={styles.icon} />
            <Text style={styles.sectionTitle}>Your Mission</Text>
          </View>
          <Text style={styles.descriptionStyle}>
            Inspire and empower aspiring professionals by offering personalized development strategies and building their confidence to thrive in tech.
          </Text>
        </View>
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
    marginTop: 40,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1c1c1e',
  },
  subtitleStyle: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    color: '#4a4a4a',
    fontWeight: '600',
  },
  scrollContainer: {
    paddingBottom: 40,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  descriptionStyle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  bulletContainer: {
    marginLeft: 5,
    marginTop: 5,
  },
  bullet: {
    fontSize: 15,
    marginBottom: 6,
    color: '#444',
  },
});

export default CareerCounselorProfile;
