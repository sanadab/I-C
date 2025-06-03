import React, { useState, useContext } from 'react';
import { View, StyleSheet ,TouchableOpacity} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen2 = ({ navigation,route }) => {
    const { state, signup } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');

    const role = route?.params?.role || 'Career Counselor'; // Default to 'Job Seeker' if not passed

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.formContainer}>
        <Input
          label="Full Name"
          labelStyle={styles.inputLabel}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputField}
          value={fullname}
          onChangeText={setFullname}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          label="Email Address"
          labelStyle={styles.inputLabel}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputField}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
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
          secureTextEntry
          label="Create Password"
          labelStyle={styles.inputLabel}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputField}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title="Sign Up"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.signUpButtonStyle}
             onPress={() => {
  console.log("Sign-up button clicked");
  signup(
    { fullname, username, email, password, role },
    () => navigation.navigate('Signin')
  );
}}
          
        />
      </Spacer>
      <Spacer>
        <Button
          title="Home"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.homeButtonStyle}
          onPress={() => navigation.goBack()}
        />
      </Spacer>
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.signInText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
};

SignupScreen2.navigationOptions = () => {
    return {
        headerShown: false, // to remove the header(navbar)
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#082567',
        marginBottom: 30,
        textAlign: 'center',
      },
      formContainer: {
        width: '100%',
        paddingHorizontal: 20,
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
        backgroundColor: '#034694',
      },
      signInText: {
        fontSize: 16,
        color: '#034694',
        textDecorationLine: 'underline',
      },
});

export default SignupScreen2;