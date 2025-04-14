import React, { useState, useContext } from 'react';
import { View, StyleSheet ,TouchableOpacity} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const ForgotPass = ({ navigation }) => {
    const { state, resetpass } = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
        
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
                            />
            {state.errorMessage ? (
                <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            ) : null}
            <Spacer>
                <Button
                    title="Reset Password"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.signUpButtonStyle}
                    onPress={() => resetpass({username,password })}
                />
            </Spacer>
        
            <Spacer>
                <Button
                    title="Sign In"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.homeButtonStyle}
                    onPress={() => navigation.navigate('Signin')}
                />
            </Spacer>
            <Spacer>
    </Spacer>
    <Spacer>
    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signInText}>Don't have an account? Sign Up</Text>
    </TouchableOpacity>
  
</Spacer>
        </View>
    );
};

ForgotPass.navigationOptions = () => {
    return {
        headerShown: false, // to remove the header(navbar)
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
        marginBottom:170
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#082567',
        marginBottom: 30,
        textAlign: 'center',
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
    signInButtonStyle: {
        color: '#4CAF50', // Green button style for sign-in
    },
    homeButtonStyle: {
        backgroundColor: '#034694',
    },
    signInText: {
        fontSize: 16,
        color: '#034694', // Text color (adjust as needed)
        textDecorationLine: 'underline', // Makes the text look like a link
    }
    
});

export default ForgotPass;