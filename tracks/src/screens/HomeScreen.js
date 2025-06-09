import React, { useState } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <Image
        source={require('../pictures/logo2.png')} 
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to Interview Coach</Text>
      
      <Button
        title="Sign Up"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.signUpButtonStyle}
        onPress={openModal}
      />
      <Button
        title="Sign In"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.signInButtonStyle}
        onPress={() => navigation.navigate('Signin')}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose Sign-Up Option</Text>
            <Button
              title="Sign Up as Job Seeker"
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.jobSeekerButtonStyle}
              onPress={() => {
                closeModal();
                navigation.navigate('Signup', { role: 'Job Seeker' });
              }}
            />
            <Button
              title="Sign Up as Career Counselor"
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.careerCounselorButtonStyle}
              onPress={() => {
                closeModal();
                navigation.navigate('SignUp2', { role: 'Career Counselor' });
              }}
            />
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    headerShown: false, // Remove the header(navbar)
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: 500, // Adjust width as needed
    height: 300, // Adjust height as needed
    marginBottom: 100, // Space between image and text
    borderRadius: 500, // Make it circular if the image is square
  },
  title: {
    color: '#082567',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: 200,
    marginVertical: 10,
  },
  signUpButtonStyle: {
    backgroundColor: 'black',
  },
  signInButtonStyle: {
    backgroundColor: '#0077b6',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#082567'
  },
  jobSeekerButtonStyle: {
    backgroundColor: 'black',
  },
  careerCounselorButtonStyle: {
    backgroundColor: '#0077b6',
  },
  closeText: {
    marginTop: 20,
    color: '#082567',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
