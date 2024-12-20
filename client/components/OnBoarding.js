import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import slides from '../slides';
import OnBoardingItem from './OnBoardingItem';
import { useNavigation } from '@react-navigation/native';  // Import for navigation

const OnBoarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();  // Hook to navigate to login page
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    // Function to navigate to login screen directly when 'Skip' is pressed
    const handleSkip = () => {
        navigation.replace('Login');  // Use navigation.replace to skip onboarding and go to Login
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={slides}
                renderItem={({ item }) => <OnBoardingItem item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}  // Hide the scroll indicator
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.contentContainer}  // Optional: To remove any extra space at the edges
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                onViewableItemsChanged={viewableItemsChanged}
            />

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Slider indicator */}
            <View style={styles.sliderContainer}>
                {slides.map((_, index) => {
                    const inputRange = [(index - 1) * 300, index * 300, (index + 1) * 300];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: 'clamp',
                    });
                    const dotOpacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    contentContainer: {
        paddingHorizontal: 0, // Remove any unnecessary padding between items
    },
    skipButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        padding: 10,
        backgroundColor: '#812F21',
        borderRadius: 15,
    },
    skipText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    sliderContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#812F21',
        margin: 5,
    },
});

export default OnBoarding;