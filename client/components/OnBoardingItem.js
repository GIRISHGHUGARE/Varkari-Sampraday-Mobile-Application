import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import React from 'react';

const OnBoardingItem = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <Image
                source={item.image}
                style={[styles.image, { width: width * 0.8, height: 300 }]}  // Adjust width and height of the image
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        justifyContent: "center",  // Ensures the image is centered
        resizeMode: "contain",     // Ensures the image doesn't stretch and maintains aspect ratio
        marginHorizontal: 20,      // Adds some space around the image
        borderRadius: 200,
        objectFit: "cover"
    },
    textContainer: {
        justifyContent: "center",
        paddingHorizontal: 20, // Optional: add some padding for better text visibility
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
        color: "#812F21"
    },
    description: {
        fontWeight: "300",
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 10, // Adjust based on your design
    },
});

export default OnBoardingItem;
