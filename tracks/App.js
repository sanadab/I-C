import { LogBox } from "react-native";

LogBox.ignoreLogs(["Support for defaultProps will be removed"]);
import React from "react";
import {StyleSheet} from 'react-native';
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import UserProfile from "./src/screens/UserProfile";
import Quiz from "./src/screens/HomeScreen";
import PiccareerC from "./src/screens/PiccareerC";
import ForgotPass from "./src/screens/ForgotPass";
import Exam1 from "./src/screens/exam";
import Behavioral from "./src/screens/Behavioral";
import HumanResources from "./src/screens/HumanResourses";
import FrontendQ1 from "./src/screens/FrontendDifficultyLevel";
import IT1 from "./src/screens/IT";
import ITQuiz1 from "./src/screens/ITQuiz1";
import ITQuiz2 from "./src/screens/ITQuiz2";
import ITQuiz3 from "./src/screens/ITQuiz3";
import FrontendQuiz1 from "./src/screens/FrontendQuiz1";
import FrontendQuiz2 from "./src/screens/FrontendQuiz2";
import FrontendQuiz3 from "./src/screens/FrontendQuiz3";
import FullstackQuiz1 from "./src/screens/FullstackQuiz1";
import FullstackQuiz2 from "./src/screens/FullstackQuiz2";
import FullstackQuiz3 from "./src/screens/FullstackQuiz3";
import Backend from "./src/screens/Backend";
import QualityAssurance from "./src/screens/QualityAssurance";
import QAQuiz1 from "./src/screens/QAQuiz1";
import QAQuiz2 from "./src/screens/QAQuiz2";
import QAQuiz3 from "./src/screens/QAQuiz3";
import CCDetails from "./src/screens/CCDetails";
import Fullstack from "./src/screens/Fullstack";
import HR1 from "./src/screens/HR";
import HRQuiz2 from "./src/screens/HRQuiz2";
import HRQuiz3 from "./src/screens/HRQuiz3";
import SignUp2 from "./src/screens/SignupScreen2";
import careercounselor from "./src/screens/careercounselorProfile";
import BackendQuiz1 from "./src/screens/BackendQuiz1";
import BackendQuiz2 from "./src/screens/BackendQuiz2";
import BackendQuiz3 from "./src/screens/BackendQuiz3";
import Examp from "./src/screens/examp";
import { Provider as AuthProvider } from './src/context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons

const ExamStack = createStackNavigator({
    Exam: Examp,
    IT: IT1,
    Backend:Backend,
    Fullstack:Fullstack,
    QualityAssurance:QualityAssurance,
    HR:HumanResources,
    HR1:HR1,
    FrontendQ1:FrontendQ1,
    Behavioral:Behavioral,
    Exam1:Exam1,
    BackendQuiz1:BackendQuiz1,
    BackendQuiz2:BackendQuiz2,
    BackendQuiz3:BackendQuiz3,
    FrontendQuiz1:FrontendQuiz1,
    FrontendQuiz2:FrontendQuiz2,
    FrontendQuiz3:FrontendQuiz3,
    FullstackQuiz1:FullstackQuiz1,
    FullstackQuiz2:FullstackQuiz2,
    FullstackQuiz3:FullstackQuiz3,
    ITQuiz1:ITQuiz1,
    ITQuiz2:ITQuiz2,
    ITQuiz3:ITQuiz3,
    QAQuiz1:QAQuiz1,
    QAQuiz2:QAQuiz2,
    QAQuiz3:QAQuiz3,
    HRQuiz2:HRQuiz2,
    HRQuiz3:HRQuiz3,
});

const mainFlow = createMaterialBottomTabNavigator({
  Profile: {
      screen: UserProfile,
      navigationOptions: {
          tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={30} color={color} /> 
          ),
      },
  },
  Exam: {
      screen: ExamStack,
      navigationOptions: {
          tabBarIcon: ({ color, size }) => (
              <Icon name="assignment" size={30} color={color} /> 
          ),
      },
  },
  CareerAdvisor: {
      screen: PiccareerC,
      navigationOptions: {
          tabBarIcon: ({ color, size }) => (
              <Icon name="person" size={30} color={color} /> // Career Advisor icon (example)
          ),
      },
  },
}, {
  activeTintColor: 'black',
  inactiveTintColor: 'white',
  barStyle: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#000',
  },
  labeled: true,
  tabBarOptions: {
      labelStyle: {
          fontWeight: 'bold',
      },
  },
});

const swichNavigator = createSwitchNavigator({
  
  loginFlow: createStackNavigator({
        Home: Quiz,
        Signup: SignupScreen,
        SignUp2: SignUp2,
        Signin: SigninScreen,
        ForgotPass: ForgotPass
    }),
    mainFlow, 

    mainFlow2: createMaterialBottomTabNavigator({
        CCProfile: careercounselor,
        Details: CCDetails
    })
});

const styles = StyleSheet.create({});
const App = createAppContainer(swichNavigator);

export default () => {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
};