import { View, Text } from 'react-native'
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
const ScreenMenu = () => {
    const [state] = useContext(AuthContext);
    const authenticatedUser = state?.user && state?.token;
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName={authenticatedUser ? "Home" : "Login"}>
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
                        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}></Stack.Screen>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
                    </>
                )
            }
        </Stack.Navigator >
    );
}

export default ScreenMenu