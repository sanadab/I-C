import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const Navbar = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  return (
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
};

const styles = StyleSheet.create({
  navbar: {
    // marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#0077b6', // Elegant deep blue
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  navItem: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Navbar;
