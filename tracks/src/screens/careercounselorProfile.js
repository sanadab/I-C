import {React,useContext} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';

const Navbar = ({ navigation }) => {

  return (
      <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.navItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.navItem}>Profile</Text>
          </TouchableOpacity>
          {/* Triggering signout directly */}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.navItem}>Log Out</Text>
          </TouchableOpacity>
      </View>
  );
};


const careercounselorProfile = ({ navigation }) => {
  return (
    <>
      <Navbar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Spacer>
          <Text style={styles.titleStyle}>Profile Page</Text>
          <Text style={styles.subtitleStyle}>What We Do</Text>
          <Text style={styles.descriptionStyle}>
            The technology and high-tech industry is constantly growing, and there is high competition in the job market today for tech roles, especially for developers, cyber professionals, and project managers. Despite the great potential in the field, many job seekers are not always successful in passing the interview stage due to insufficient preparation or lack of soft skills (such as communication and presenting ideas), despite having strong technical abilities.
            As part of the challenging job search process, job seekers are required to prepare for interviews that involve both technical fields (such as solving coding problems, data structures, and algorithms) and soft skills (such as teamwork, time management, and communication). They must face interviews with technical teams, negotiations with HR managers, and sometimes even discussions with professional consultants.
            Although there are now various apps and websites focusing on job interview preparation, most offer limited solutions that do not address the diverse needs of job seekers. They either do not provide personalized tests, do not offer personal-level professional guidance, or lack access to relevant resources.
          </Text>
          
          {/* New section for topics to learn */}
          <Text style={styles.subtitleStyle}>Topics You Will Learn</Text>
          <Text style={styles.descriptionStyle}>
            In this app, you will be able to improve your technical and soft skills by practicing topics such as:
            - Data Structures (Arrays, Linked Lists, Trees, Graphs)
            - Algorithms (Sorting, Searching, Dynamic Programming)
            - System Design
            - Coding Challenges and Problem Solving
            - Soft Skills (Teamwork, Time Management, Communication)
            - Interview Techniques and Strategies
            - Negotiation Skills for HR Discussions
          </Text>
        </Spacer>
      </ScrollView>
    </>
  );
};

careercounselorProfile.navigationOptions = {
  headerLeft: null,  // Removes the back button or any title in the top left corner
  headerTitle: null, // Removes the title (e.g., 'Exam') from the navbar
};

const styles = StyleSheet.create({
  navbar: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomColor: '#ddd',
  },
  navItem: {
    fontSize: 18,
    color: '#034694',
    fontWeight: 'bold',

  },
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
    paddingBottom: 20, // Adds some padding to the bottom for better scrolling behavior
  },
});

export default careercounselorProfile;
