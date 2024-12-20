import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    // Navigate to the next screen after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('OnBoardingScreen'); // Replace 'OnBoardingScreen' with your target screen
        }, 3000); // Wait for 3 seconds before navigating

        // Clear the timeout if the component is unmounted before the timeout finishes
        return () => clearTimeout(timer);
    }, [navigation]);

    // Handle the tap event to navigate immediately
    const handleTap = () => {
        navigation.navigate('OnBoardingScreen'); // Replace 'OnBoardingScreen' with your target screen
    };

    return (
        <TouchableWithoutFeedback onPress={handleTap}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/SplashImage.png')}
                    style={styles.image}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center the image horizontally and vertically
        alignItems: 'center',
        backgroundColor: 'white', // You can change the background color if needed
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Ensures the image covers the whole screen without stretching
    },
});

export default SplashScreen;
