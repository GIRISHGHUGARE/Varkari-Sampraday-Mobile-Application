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
            const { data } = await axios.post("/auth/register", {
                name,
                email,
                password,
            });
            alert(data && data.message);
            navigation.navigate("Login");
            // console.log("Register Data==> ", { name, email, password });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 20, flex: 0.3 }}>
                <InputBox inputTitle={'NAME'} value={name} setValue={setName} iconStart={'user-alt'} />
                <InputBox
                    inputTitle={'EMAIL'}
                    keyboardType={'email-address'}
                    autoComplete={"email"}
                    value={email}
                    setValue={setEmail}
                    iconStart={'envelope'}
                />
                <InputBox
                    inputTitle={'PASSWORD'}
                    secureTextEntry={true}
                    autoComplete={"password"}
                    value={password}
                    setValue={setPassword}
                    iconStart={'lock'}
                />
                <Text style={styles.linkText}>Already have a account?{" "} <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Sign in</Text></Text>
                {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
                <SubmitButton
                    btnTitle="Sign Up"
                    loading={loading}
                    handleSubmit={handleSubmit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    linkText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20
    },
    link: {
        color: 'red',
        fontWeight: "bold"
    }
})

export default Register;