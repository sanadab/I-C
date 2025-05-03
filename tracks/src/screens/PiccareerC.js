import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const PiccareerC = ({ navigation }) => {
    const [counselors, setCounselors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCounselors, setFilteredCounselors] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await trackerApi.get('/details/all-counselors', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCounselors(response.data);
                setFilteredCounselors(response.data);
            } catch (err) {
                console.error('Failed to fetch details:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        if (value) {
            navigation.navigate(value); // Assuming category screens
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredCounselors(counselors);
        } else {
            const filtered = counselors.filter((counselor) =>
                counselor.name.toLowerCase().includes(query.toLowerCase()) ||
                counselor.expertise.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCounselors(filtered);
        }
    };

    const handleSignout = () => {
        // Handle signout here if needed
        navigation.navigate('loginFlow'); // Navigate to the login flow or root
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!counselors || counselors.length === 0) {
        return (
            <View style={styles.loaderContainer}>
                <Text style={styles.errorText}>No career counselor data found.</Text>
            </View>
        );
    }

    return (
        <>
            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.navItem}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.navItem}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignout}>
                    <Text style={styles.navItem}>Log Out</Text>
                </TouchableOpacity>
                <RNPickerSelect
                    onValueChange={handleCategoryChange}
                    items={[
                        { label: 'Artificial Intelligence', value: 'AI' },
                        { label: 'Software Engineering', value: 'Software Engineer' },
                        { label: 'Cybersecurity', value: 'Cybersecurity' },
                        // Add other categories as needed
                    ]}
                    placeholder={{ label: 'Choose a category...', value: null }}
                    style={{
                        inputIOS: styles.pickerStyle,
                        inputAndroid: styles.pickerStyle,
                    }}
                />
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Career Counselors</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or expertise"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            {/* Main Content */}
            <ScrollView contentContainerStyle={styles.container}>
                {filteredCounselors.length === 0 ? (
                    <Text style={styles.errorText}>No counselors found matching your search criteria.</Text>
                ) : (
                    filteredCounselors.map((counselor, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.header}>{counselor.name}</Text>

                            <Text style={styles.subHeader}>Expertise:</Text>
                            <Text style={styles.text}>{counselor.expertise}</Text>

                            <Text style={styles.subHeader}>Courses:</Text>
                            {counselor.courses.map((course, idx) => (
                                <Text key={idx} style={styles.listItem}>• {course}</Text>
                            ))}

                            <Text style={styles.subHeader}>Testimonials:</Text>
                            {counselor.testimonials.map((testimonial, idx) => (
                                <View key={idx} style={styles.testimonialBox}>
                                    <Text style={styles.text}>{testimonial}</Text>
                                </View>
                            ))}
                        </View>
                    ))
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 16,
        color: '#d9534f',
    },
    navbar: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    navItem: {
        fontSize: 18,
        color: '#034694',
        fontWeight: 'bold',
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
    titleContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: '#374151',
    },
    searchContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginTop: 14,
        marginBottom: 4,
    },
    text: {
        fontSize: 15,
        color: '#4b5563',
        lineHeight: 22,
    },
    listItem: {
        fontSize: 14,
        color: '#374151',
        marginLeft: 12,
        marginTop: 4,
    },
    testimonialBox: {
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 12,
        marginTop: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#3b82f6',
    },
});

export default PiccareerC;
