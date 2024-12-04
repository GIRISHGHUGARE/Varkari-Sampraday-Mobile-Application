import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
    //global state
    const [state, setState] = useContext(AuthContext);

    // states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
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
            <Text style={styles.pageTitle}>Login</Text>
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
                    secureTextEntry={true}
                    autoComplete={"password"}
                    value={password}
                    setValue={setPassword}
                />
            </View>
            {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
            <SubmitButton
                btnTitle="Login"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>Not A User Please{" "} <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Register</Text></Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ded9ee"
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
        color: 'red'
    }
})
export default Login