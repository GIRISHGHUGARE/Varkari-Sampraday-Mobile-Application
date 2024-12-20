import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import SubmitButton from './Forms/SubmitButton';

const SplashFeatures = () => {
    const [loading, setLoading] = useState(true);
    const [screenOne, setscreenOne] = useState(true);
    const [screenTwo, setscreenTwo] = useState(false);
    const [screenThree, setscreenThree] = useState(false);
    const [screenFour, setscreenFour] = useState(false);
    const [screenFive, setscreenFive] = useState(false);
    const handleSubmit = () => {

    }
    return (
        <View style={styles.container}>
            {screenOne == true ? (
                <View>
                    <Image
                        source={require('../assets/aaiVarkari.png')}
                        style={styles.image}
                    />
                    <View style={styles.featuresText}>
                        <Text style={styles.headerText}>Your Adventure Awaits</Text>
                        <Text style={styles.descText}>Ready to embark on your pilgrimage? Let’s begin this transformative journey together.</Text>
                    </View>
                    <View>
                        <SubmitButton
                            btnTitle="Skip"
                            loading={loading}
                            handleSubmit={handleSubmit}
                        />
                    </View>
                </View>
            ) : (<></>)}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '55%',
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150
    },
    featuresText: {
        justifyContent: 'center', // Center the image horizontally and vertically
        alignItems: 'center',
        backgroundColor: 'white', // You can change the background color if needed
    },
    headerText: {
        marginVertical: 20,
        fontWeight: "bold",
        fontSize: 32,
        color: "#812F21"
    },
    descText: {
        marginVertical: 20,
        fontSize: 18,
        marginHorizontal: 10
    }
});
export default SplashFeatures