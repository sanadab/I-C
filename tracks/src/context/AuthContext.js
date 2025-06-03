import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { Alert } from 'react-native';




const authReduser = (state, action) => {

    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload };

        case 'signup':
            return { errorMessage: '', token: action.payload };


        default:
            return state;
    }

};

const signup = (dispatch) => 
  async ({ fullname, username, email, password, role }, callback) => {
    try {
      console.log("Sending request to backend...");
      const response = await trackerApi.post('/signup', {
        fullname,
        username,
        email,
        password,
        role,
      });

      console.log(response.data.token);
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signup', payload: response.data.token });

      // ✅ Only call if provided
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up',
      });
    }
  };


const Details = (dispatch) => async ({ name, expertise, courses, testimonials }) => {
    try {
        const token = await AsyncStorage.getItem('token'); 

        const response = await trackerApi.post(
            '/Details',
            { name, expertise, courses, testimonials },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        dispatch({ type: 'DetailsSuccess' }); 

        Alert.alert("Success", "Details submitted successfully!");
    } catch (err) {
        console.error('Details error:', err.message);
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with details submit',
        });
    }
};

const signin = (dispach) => async({ username, password, navigation }) => {
    //try to sign in 
    try {
        const response = await trackerApi.post('/signin', { username, password });
        console.log('Response Data:', response.data); // Log the full response to check the `role`


        const { token, role } = response.data;

        // Save the token and role to AsyncStorage
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('role', role); // Save the role
        dispach({ type: 'signin', payload: response.data.token });
        if (role === 'Career Counselor') {
            navigation.navigate('CCProfile'); // Change to the correct profile screen
        } else if (role === 'Job Seeker') {
            navigation.navigate('Profile'); // Change to the correct profile screen
        }
    } catch (err) {
        console.log(err.message);

        dispach({ type: 'add_error', payload: 'Somthing went wrong with sign in' })
    }


    //if we sign in ,modify our state,and say that we are in
};
const resetpass = (dispach) => async({ username, password }) => {
    //try to sign in 
    try {
        const response = await trackerApi.post('/resetpass', { username, password });
        console.log(response.data.token);
        await AsyncStorage.setItem('token', response.data.token);
        dispach({ type: 'resetpass', payload: response.data.token });
    } catch (err) {
        console.log(err.message);

        dispach({ type: 'add_error', payload: 'Somthing went wrong with sign in' })
    }


    //if we sign in ,modify our state,and say that we are in
};

const signout = (dispach) => {
    return () => {
        //try to sign out

        //if we sign out ,modify our state,and say that we are out
    }
};
export const { Provider, Context } = createDataContext(
    authReduser, { signup, signin, signout, resetpass, Details }, { token: null, errorMessage: '' }
);
import { useContext } from 'react';
export const useAuth = () => useContext(Context);