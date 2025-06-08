import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const Navbar = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  return (
    <View style={styles.navbar}>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navItem}>Home</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => navigation.navigate('ConsulorProfile')}>
        <Text style={styles.navItem}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          signout(() => navigation.navigate('Signin'));
        }}
      >
        <Text style={styles.navItem}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ConversationsList')}>
        <Text style={styles.navItem}>Inbox</Text>
      </TouchableOpacity>
    </View>
  );
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
});

export default Navbar;
