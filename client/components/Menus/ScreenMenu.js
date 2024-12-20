import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../../screens/Home";
import Register from '../../screens/auth/Register';
import Login from '../../screens/auth/Login';
import { AuthContext } from '../../context/authContext';
import HeaderMenu from './HeaderMenu';
import About from '../../screens/About';
import Post from '../../screens/Post';
import Account from '../../screens/Account';
import Myposts from '../../screens/Myposts';
import SplashScreen from '../../screens/SplashScreen';
import OnBoarding from '../OnBoarding';  // Correct case

const ScreenMenu = () => {
    const [state] = useContext(AuthContext);
    const authenticatedUser = state?.user && state?.token;
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName={authenticatedUser ? "Home" : "SplashScreen"}>
            {authenticatedUser ?
                (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{
                                title: "Varkari Sampraday",
                                headerRight: () => <HeaderMenu />
                            }}
                        />
                        <Stack.Screen
                            name="Myposts"
                            component={Myposts}
                            options={{
                                headerBackTitle: 'Back',
                                headerRight: () => <HeaderMenu />
                            }}
                        />
                        <Stack.Screen
                            name="Post"
                            component={Post}
                            options={{
                                headerBackTitle: 'Back',
                                headerRight: () => <HeaderMenu />
                            }}
                        />
                        <Stack.Screen
                            name="Account"
                            component={Account}
                            options={{
                                headerBackTitle: 'Back',
                                headerRight: () => <HeaderMenu />
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Register"
                            component={Register}
                            options={{
                                headerShown: true, // Show the header
                                headerStyle: styles.headerStyle, // Styling the header container
                                headerTitle: () => (
                                    <View style={styles.headerTitleContainer}>
                                        <Image
                                            source={require('../../assets/Vitthal_Black.png')} // Path to your image
                                            style={styles.headerImage}
                                        />
                                    </View>
                                ),
                                headerTitleAlign: 'center', // Align the header title/image
                                headerTransparent: true, // Allow content to overlap the header
                            }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{
                                headerShown: true, // Show the header
                                headerStyle: styles.headerStyle, // Styling the header container
                                headerTitle: () => (
                                    <View style={styles.headerTitleContainer}>
                                        <Text>Welcome</Text>
                                        <Image
                                            source={require('../../assets/Vitthal_Black.png')} // Path to your image
                                            style={styles.headerImage}
                                        />
                                    </View>
                                ),
                                headerTitleAlign: 'center', // Align the header title/image
                                headerTransparent: true, // Allow content to overlap the header
                            }}
                        />


                        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}></Stack.Screen>
                        <Stack.Screen name="OnBoardingScreen" component={OnBoarding} options={{ headerShown: false }}></Stack.Screen>
                    </>
                )
            }
        </Stack.Navigator >
    );
}
const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#812F21', // Header background color
        height: 250, // Set the custom header height here
        shadowColor: 'transparent', // Optional: Remove shadow for a cleaner look
    },
    headerTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // Centering the image horizontally
        flex: 1, // Take up the full height of the header
    },
    headerImage: {
        width: 200, // Set the width of the image
        height: 150, // Set the height of the image
        resizeMode: 'contain', // Make sure the image doesn't stretch
    },
});

export default ScreenMenu