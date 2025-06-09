import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';

const { width } = Dimensions.get('window');

const SquareButton = ({ onPress, title, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.button}>
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FrontendDifficultyLevel = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f3f6" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titleStyle}>Frontend Quiz</Text>
        <Text style={styles.subtitleStyle}>Select Difficulty Level</Text>

        <Spacer>
          <SquareButton
            onPress={() => navigation.navigate('Beginner')}
            title="Beginner"
            icon={<Text style={styles.iconText}>📘</Text>}
          />
        </Spacer>
        <Spacer>
          <SquareButton
            onPress={() => navigation.navigate('Intermediate')}
            title="Intermediate"
            icon={<Text style={styles.iconText}>📙</Text>}
          />
        </Spacer>
        <Spacer>
          <SquareButton
            onPress={() => navigation.navigate('Advanced')}
            title="Advanced"
            icon={<Text style={styles.iconText}>📕</Text>}
          />
        </Spacer>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  scrollContainer: {
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleStyle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: width * 0.9,
    height: 130,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495e',
    marginTop: 8,
  },
  icon: {
    marginBottom: 5,
  },
  iconText: {
    fontSize: 36,
  },
});

export default FrontendDifficultyLevel;
