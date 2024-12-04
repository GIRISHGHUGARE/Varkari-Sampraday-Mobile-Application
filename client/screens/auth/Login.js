import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import InputBox from '../../components/InputBox'
import SubmitButton from '../../components/SubmitButton'


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    //Function
    const handleSubmit = () => {
        try {
            setLoading(true);
            if (!email || !password) {
                Alert.alert('Please Fill All Fields');
                setLoading(false);
                return;
            }
            setLoading(false);
            console.log("Login Data==>", { email, password })
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
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