import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import RNPickerSelect from 'react-native-picker-select';

const exam = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value) {
      navigation.navigate(value); // Assuming each category screen is named after the category
    }
  };

  return (
    <>
      <Spacer>
        <Text style={styles.titleStyle}>Exam Page</Text>
      </Spacer>
      <Spacer>
        <Text style={styles.labelStyle}>Select Examp Category:</Text>
        <RNPickerSelect
  onValueChange={handleCategoryChange}
  items={[
    { label: 'Artificial Intelligence', value: 'AI' },
    { label: 'Software Engineer', value: 'Software Engineer' },
    { label: 'Quantum Computing', value: 'Quantum Computing' },
    { label: 'Augmented Reality', value: 'Augmented Reality' },
    { label: 'Cybersecurity', value: 'Cybersecurity' },
    { label: 'Cloud Computing', value: 'Cloud Computing' },
    { label: '5G Technology', value: '5G Technology' },
    { label: 'IoT (Internet of Things)', value: 'IoT (Internet of Things)' },
    { label: 'Robotics', value: 'Robotics' },
    { label: 'Big Data', value: 'Big Data' },
  ]}
  placeholder={{ label: 'Choose a category...', value: null }}
  style={{
    inputIOS: styles.pickerStyle,
    inputAndroid: styles.pickerStyle,
  }}
/>
      </Spacer>
      {selectedCategory && (
        <View style={styles.imageContainer}>
          <Text style={styles.selectedTextStyle}>
            Selected Category: {selectedCategory}
          </Text>
        </View>
      )}
    </>
  );
};
exam.navigationOptions = () => {
  return {
    headerShown: false, // Remove the header(navbar)
  };
};

const styles = StyleSheet.create({
  titleStyle: {
    marginTop: 50,
    fontSize: 48,
    textAlign: 'center',
    color: '#034694',
  },
  labelStyle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  pickerStyle: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 4,
    color: 'black',
    backgroundColor: '#f9f9f9',
  },
  selectedTextStyle: {
    marginTop: 20,
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default exam;
