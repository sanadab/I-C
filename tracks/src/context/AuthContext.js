import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";





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

const signup = (dispach) => async({ fullname, username, email, password, role }) => {
    //make api req to sign up with that email and password
    try {
        console.log("Sending request to backend...");
        const response = await trackerApi.post('/signup', { fullname, username, email, password, role });
        console.log(response.data.token);
        console.log("asdsdadsa");
        await AsyncStorage.setItem('token', response.data.token);
        dispach({ type: 'signup', payload: response.data.token });
    } catch (err) {
        console.log(err.message);

        dispach({ type: 'add_error', payload: 'Somthing went wrong with sign up' })
    }
    //if we sign up ,modify our state,and say that we are authenticated
};

const Details = (dispatch) => async({ name, expertise, course, testimonial }) => {
    try {
        const response = await trackerApi.post('/Details', { name, expertise, course, testimonial });

        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'Details', payload: response.data.token });
    } catch (err) {
        console.error('Sign-up error:', err.message);
        dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
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
    authReduser, { signup, signin, signout, resetpass }, { token: null, errorMessage: '' }
);