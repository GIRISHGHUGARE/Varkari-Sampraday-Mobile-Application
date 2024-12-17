import { View, Text, StyleSheet, TextInput, Alert, Image, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const Login = ({ navigation }) => {
    //global state
    const [state, setState] = useContext(AuthContext);

    // states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    //function
    // btn funcn
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
                Alert.alert("Please Fill All Fields");
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post("/auth/login", { email, password });
            setState(data);
            await AsyncStorage.setItem("@auth", JSON.stringify(data));
            alert(data && data.message);
            navigation.navigate("Home");
            console.log("Login Data==> ", { email, password });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };
    //temp function to check local storage data
    const getLcoalStorageData = async () => {
        let data = await AsyncStorage.getItem("@auth");
        console.log("Local Storage ==> ", data);
    };
    getLcoalStorageData();
    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={{ height: 150, width: 150, alignSelf: "center", objectFit: "contain" }}
                />
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox
                    inputTitle={'EMAIL'}
                    keyboardType={'email-address'}
                    autoComplete={"email"}
                    value={email}
                    setValue={setEmail}

                />
                <InputBox
                    inputTitle={'PASSWORD'}
                    secureTextEntry={isPasswordShown}
                    autoComplete={"password"}
                    value={password}
                    setValue={setPassword}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordShown(!isPasswordShown)}
                    style={{ position: "absolute", right: 12, bottom: 30 }}
                >
                    {
                        isPasswordShown == true ? (
                            <>
                                <FontAwesome5
                                    name="eye-slash"
                                    size={24}
                                />
                            </>
                        ) : (
                            <>
                                <FontAwesome5
                                    name="eye"
                                    size={24}
                                />
                            </>
                        )
                    }
                </TouchableOpacity>
            </View>
            {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
            <SubmitButton
                btnTitle="Login"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>Don't have an account?{" "} <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Sign up</Text></Text>
            {/* </ImageBackground> */}
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        fontFamily: "poppins",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    linkText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18

    },
    link: {
        color: 'red',
        fontWeight: "bold"
    },
    img: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default Login;