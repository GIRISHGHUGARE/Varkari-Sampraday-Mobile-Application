import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu'
import axios from 'axios'

const Account = () => {
    // global state
    const [state, setState] = useContext(AuthContext)
    const { user, token } = state;

    // local state
    const [name, setName] = useState(user?.name);
    const [password, setPassword] = useState(user?.password);
    const [email] = useState(user?.email);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true)
            const { data } = await axios.put('http://192.168.0.114:8080/api/v1/auth/update-user', {
                name, email, password
            })
            setLoading(false);
            let UD = JSON.stringify(data);
            setState({ ...state, user: UD?.updatedUser })
            alert(data && data.message)
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Image
                        source={require('../assets/aaiVarkari.png')}
                        style={{ height: 200, width: 200, alignSelf: "center" }}
                    />
                </View>
                <Text style={styles.warningText}>Currently you can only update your name and password</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={email}
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Role</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={state?.user.role}
                        editable={false}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                        <Text style={styles.updateBtnText}>
                            {loading ? 'Please Wait' : 'Update Profile'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterMenu />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        marginTop: 40
    },
    warningText: {
        color: "red",
        fontSize: 13,
        textAlign: "center"
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center"
    },
    inputText: {
        fontWeight: "bold",
        width: 70,
        color: "grey"
    },
    inputBox: {
        height: 40,
        width: 250,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 5
    },
    updateBtn: {
        backgroundColor: "black",
        color: "white",
        height: 40,
        width: 250,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30,
    },
    updateBtnText: {
        color: "white",
        fontSize: 16
    }
})

export default Account;
