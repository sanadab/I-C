import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.navItem}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const Examp = ({ navigation }) => {
  return (
    <>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Exam Categories</Text>
        <Spacer>
          <Text style={styles.labelStyle}>Select Exam Category:</Text>
        </Spacer>
        {[
          { label: 'Frontend Developer', route: 'FrontendQ1' },
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
      </View>
    </>
  );
};

Examp.navigationOptions = {
  headerLeft: null,
  headerTitle: null,
};

const styles = StyleSheet.create({
  navbar: {
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navItem: {
    fontSize: 18,
    color: '#034694',
    fontWeight: 'bold',

  },
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
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
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleStyle: {
    marginTop: 20,
    fontSize: 48,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Examp;
