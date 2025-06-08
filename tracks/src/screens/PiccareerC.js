import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, ActivityIndicator,
    TouchableOpacity, TextInput,
} from 'react-native';
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
                if (!token) {
                    console.warn('No token found');
                    setLoading(false);
                    return;
                }

                const response = await trackerApi.get('/details/all-counselors', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setCounselors(response.data);
                setFilteredCounselors(response.data);
            } catch (err) {
                console.error('Failed to fetch details:', err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        if (value) {
            navigation.navigate(value);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = query
            ? counselors.filter((c) =>
                  c.name.toLowerCase().includes(query.toLowerCase()) ||
                  c.expertise.toLowerCase().includes(query.toLowerCase())
              )
            : counselors;

        setFilteredCounselors(filtered);
    };

    const handleChat = (counselorId, counselorName) => {
        navigation.navigate('ChatScreen', {
            counselorId,
            counselorName,
        });
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.navItem}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.navItem}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('loginFlow')}>
                    <Text style={styles.navItem}>Log Out</Text>
                </TouchableOpacity>
                <RNPickerSelect
                    onValueChange={handleCategoryChange}
                    items={[
                        { label: 'Artificial Intelligence', value: 'AI' },
                        { label: 'Software Engineering', value: 'Software Engineer' },
                        { label: 'Cybersecurity', value: 'Cybersecurity' },
                    ]}
                    placeholder={{ label: 'Choose a category...', value: null }}
                    style={{
                        inputIOS: styles.pickerStyle,
                        inputAndroid: styles.pickerStyle,
                    }}
                />
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Career Counselors</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or expertise"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {filteredCounselors.length === 0 ? (
                    <Text style={styles.errorText}>
                        No counselors found matching your search criteria.
                    </Text>
                ) : (
                    filteredCounselors.map((counselor, index) => (
                        <View key={counselor._id || index} style={styles.card}>
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

                            <TouchableOpacity
                                style={styles.chatButton}
                                onPress={() => handleChat(counselor.userId, counselor.name)}>
                                <Text style={styles.chatButtonText}>Chat with Counselor</Text>
                            </TouchableOpacity>
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
    chatButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    chatButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default PiccareerC;
