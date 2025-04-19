import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator,
} from 'react-native';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PiccareerC = () => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await trackerApi.get('/Details', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDetails(response.data);
            } catch (err) {
                console.error('Failed to fetch details:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!details) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={styles.errorText}>No career counselor data found.</Text>
            </View>
        );
    }

    const { name, expertise, courses, testimonials } = details;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>{name}</Text>

            <Text style={styles.subHeader}>Expertise:</Text>
            <Text style={styles.text}>{expertise}</Text>

            <Text style={styles.subHeader}>Courses:</Text>
            <FlatList
                data={courses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
            />

            <Text style={styles.subHeader}>Testimonials:</Text>
            <FlatList
                data={testimonials}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.testimonialBox}>
                        <Text style={styles.text}>{item}</Text>
                    </View>
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        marginTop: 5,
    },
    listItem: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
    },
    testimonialBox: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
});

export default PiccareerC;
