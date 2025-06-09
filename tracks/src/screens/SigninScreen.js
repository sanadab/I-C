import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Feather';

const SigninScreen = ({ navigation }) => {
  const { state, signin } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Input
        label="Username"
        labelStyle={styles.inputLabel}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputField}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Input
        label="Password"
        labelStyle={styles.inputLabel}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputField}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={!showPassword}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
          </TouchableOpacity>
        }
      />

      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}

      <Spacer>
        <Button
          title="Sign In"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.signUpButtonStyle}
          onPress={() => signin({ username, password, navigation })}
        />
      </Spacer>

      <Spacer>
        <Button
          title="Home"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.homeButtonStyle}
          onPress={() => navigation.navigate('Home')}
        />
      </Spacer>

      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
          <Text style={styles.signInText}>Forgot your password? Reset it here</Text>
        </TouchableOpacity>
      </Spacer>

      <Spacer>
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.signInText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </Spacer>

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

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    marginBottom: 170,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#082567',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  inputLabel: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputField: {
    textAlign: 'left',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
  },
  buttonContainer: {
    width: 200,
    marginVertical: 5,
  },
  signUpButtonStyle: {
    backgroundColor: 'black',
  },
  homeButtonStyle: {
    backgroundColor: '#0077b6',
  },
  signInText: {
    fontSize: 16,
    color: '#034694',
    textDecorationLine: 'underline',
    textAlign: 'center',
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
    color: '#082567',
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

export default SigninScreen;
