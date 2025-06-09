import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/Feather';

const UserProfile = ({ navigation }) => {
  return (
    <>
      <Spacer />
      <Navbar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titleStyle}>Job Seeker</Text>
        <Text style={styles.subtitleStyle}>Level Up Your Tech Career</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="activity" size={20} color="#034694" style={styles.icon} />
            <Text style={styles.sectionTitle}>Your Journey</Text>
          </View>
          <Text style={styles.descriptionStyle}>
            As a motivated job seeker, you're preparing to enter the tech industry with the right skills, mindset, and confidence. This app supports your growth through curated guidance and real-world practices.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="book-open" size={20} color="#034694" style={styles.icon} />
            <Text style={styles.sectionTitle}>Topics You'll Master</Text>
          </View>
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>• Data Structures (Arrays, Trees, Graphs)</Text>
            <Text style={styles.bullet}>• Algorithms (Sorting, Searching, Dynamic Programming)</Text>
            <Text style={styles.bullet}>• System Design Basics</Text>
            <Text style={styles.bullet}>• Coding Challenges & Debugging</Text>
            <Text style={styles.bullet}>• Time Management & Team Collaboration</Text>
            <Text style={styles.bullet}>• Interview Skills & Mock Sessions</Text>
            <Text style={styles.bullet}>• Salary Negotiation Tips</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="target" size={20} color="#034694" style={styles.icon} />
            <Text style={styles.sectionTitle}>Your Goal</Text>
          </View>
          <Text style={styles.descriptionStyle}>
            Secure your place in the tech world by mastering both technical expertise and workplace readiness — and turn interviews into offers.
          </Text>
        </View>
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
    marginTop: 20,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
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

export default UserProfile;
