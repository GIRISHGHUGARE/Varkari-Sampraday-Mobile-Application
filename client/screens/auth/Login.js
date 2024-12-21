import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Google from 'expo-auth-session/providers/google';
import { useAuthRequest } from "expo-auth-session";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Login = ({ navigation }) => {
    const [state, setState] = useContext(AuthContext);

    // States for email/password login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Google authentication
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "768682582810-0cj57ttmiubm9fjnhqtnle277cc9best.apps.googleusercontent.com", // Replace with your Google client ID
        redirectUri: "https://varkari-sampraday-mobile-application.onrender.com/api/v1/auth/google/callback", // Your server callback URL
    });

    // Handle Google authentication response
    React.useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            // Send the id_token to the server to validate and log the user in
            loginWithGoogle(id_token);
        }
    }, [response]);

    // Function to handle Google login
    const loginWithGoogle = async (id_token) => {
        try {
            setLoading(true);
            const { data } = await axios.post("https://varkari-sampraday-mobile-application.onrender.com/api/v1/auth/google-login", { id_token });
            setState(data);
            await AsyncStorage.setItem("@auth", JSON.stringify(data));
            alert(data.message);
            navigation.navigate("Home");
        } catch (error) {
            alert("Google login failed!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle email/password login
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
                Alert.alert("Please Fill All Fields");
                setLoading(false);
                return;
            }
            const { data } = await axios.post("https://varkari-sampraday-mobile-application.onrender.com/api/v1/auth/login", { email, password });
            setState(data);
            await AsyncStorage.setItem("@auth", JSON.stringify(data));
            alert(data.message);
            navigation.navigate("Home");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 20, flex: 0.3 }}>
                {/* Email input */}
                <InputBox
                    inputTitle={'EMAIL'}
                    keyboardType={'email-address'}
                    autoComplete={"email"}
                    value={email}
                    setValue={setEmail}
                    iconStart={'envelope'}
                />
                {/* Password input */}
                <InputBox
                    inputTitle={'PASSWORD'}
                    autoComplete={"password"}
                    value={password}
                    setValue={setPassword}
                    iconStart={'lock'}
                    iconEnd={'eye-slash'}
                />
                {/* Register Link */}
                <Text style={styles.linkText}>
                    Don't have an account?{" "}
                    <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Register Now</Text>
                </Text>

                {/* Submit Button for Email/Password Login */}
                <SubmitButton
                    btnTitle="Login"
                    loading={loading}
                    handleSubmit={handleSubmit}
                />

                {/* Google Sign-In Button */}
                <SubmitButton
                    btnTitle="Login with Google"
                    loading={loading}
                    handleSubmit={() => promptAsync()} // This triggers the Google login flow
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        fontFamily: "poppins",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
    },
    linkText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
    },
    link: {
        color: 'red',
        fontWeight: "bold",
    },
    img: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login;
