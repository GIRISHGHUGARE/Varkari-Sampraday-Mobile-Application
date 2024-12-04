import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import InputBox from '../../components/InputBox'
import SubmitButton from '../../components/SubmitButton'

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    //Function
    const handleSubmit = () => {
        try {
            setLoading(true);
            if (!name || !email || !password) {
                Alert.alert('Please Fill All Fields');
                setLoading(false);
                return;
            }
            setLoading(false);
            console.log("Register Data==>", { name, email, password })
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
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
            <Text style={styles.linkText}>Already Register Please{" "} <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
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

export default Register