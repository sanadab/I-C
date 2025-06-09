import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar'; // ✅ Job Seeker Navbar


const Examp = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  const CustomNavbar = () => (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.navItem}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          signout(() => navigation.navigate('Signin'));
        }}
      >
        <Text style={styles.navItem}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
        <Text style={styles.navItem}>Inbox</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Spacer></Spacer>
    <Navbar navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titleStyle}>Exam Categories</Text>
        <Spacer>
          <Text style={styles.labelStyle}>Select Exam Category:</Text>
        </Spacer>
        <Spacer></Spacer>
                <Spacer></Spacer>

        {[
          { label: 'Frontend Developer', route: 'Frontend' },
          { label: 'Backend Developer', route: 'Backend' },
          { label: 'Fullstack Developer', route: 'Fullstack' },
          { label: 'Information Technology', route: 'IT' },
          { label: 'Quality Assurance', route: 'QualityAssurance' },
          { label: 'Human Resources', route: 'HR' },
        ].map((category, index) => (
          <Spacer key={index}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(category.route)}
            >
              <Text style={styles.buttonText}>{category.label}</Text>
            </TouchableOpacity>
          </Spacer>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#0077b6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  navItem: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  labelStyle: {
    fontSize: 22,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleStyle: {
    marginTop: 20,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Examp;
