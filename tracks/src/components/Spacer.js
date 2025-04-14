import React from "react";
import { View, StyleSheet } from 'react-native';

const Spacer = ({ children }) => {
    return <View style={styles.spacer}>{children}</View>; // Removed the extra space inside the View
};

const styles = StyleSheet.create({
    spacer: {
        margin: 10
    }
});

export default Spacer;
