import React from 'react';
import { View, StyleSheet ,TouchableOpacity} from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';

const SquareButton = ({ onPress, title, icon }) => {
  return (
    <>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>


    </>
  );
};

const Backend = ({navigation}) => {
  const handlePress = () => {
    console.log('Button Pressed');
  };

  return (
    <>
    <Text style={styles.titleStyle}>Pic a Quiz</Text>

    <View style={styles.container}>
      <SquareButton
        onPress={()=> navigation.navigate('BackendQuiz1')}
        title="Level 1"
        icon={<Text style={styles.iconText}>🔵</Text>} // example icon
      />
      <Spacer>
         <SquareButton
        onPress={()=> navigation.navigate('BackendQuiz2')}
        title="Level 2"
        icon={<Text style={styles.iconText}>🔵</Text>} // example icon
      />
      </Spacer>
      <Spacer>
         <SquareButton
        onPress={()=> navigation.navigate('BackendQuiz3')}
        title="Level 3"
        icon={<Text style={styles.iconText}>🔵</Text>} // example icon
      />
      </Spacer>
    </View>
   
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop:100,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },

  button: {
    width: 300,
    height: 150,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5, // for Android shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  icon: {
    marginBottom: 10,
  },
  iconText: {
    fontSize: 30,
  },
  titleStyle: {
    marginTop: 40,
    fontSize: 48,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Backend;
