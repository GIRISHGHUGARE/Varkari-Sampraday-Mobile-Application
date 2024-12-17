import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
    // states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    //function
    // btn funcn
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!name || !email || !password) {
                Alert.alert("Please Fill All Fields");
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post("http://192.168.0.114:8080/api/v1/auth/register", {
                name,
                email,
                password,
            });
            alert(data && data.message);
            navigation.navigate("Login");
            console.log("Register Data==> ", { name, email, password });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Register</Text>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox inputTitle={'NAME'} value={name} setValue={setName} />
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
                btnTitle="Register"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>Already have a account?{" "} <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Sign in</Text></Text>
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
        color: 'red',
        fontWeight: "bold"
    }
})

export default Register;