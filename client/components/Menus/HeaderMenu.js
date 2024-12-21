import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderMenu = () => {
    const [state, setState] = useContext(AuthContext);

    const handleLogout = async () => {
        setState({ token: "", user: null });
        await AsyncStorage.removeItem('@auth');
        alert("Logout Successfully");
    };

    return (
        <View style={styles.container}>
            {/* Search Bar Container */}
            <View style={styles.inputContainer}>
                <FontAwesome5 name={"search"} size={20} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.inputBox}
                    placeholder="Search..."
                />
            </View>

            {/* Logout Button */}
            <View>
                <TouchableOpacity onPress={handleLogout}>
                    <FontAwesome5 name="sign-out-alt" style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,  // Adjust for better spacing
        paddingTop: 10,
        paddingBottom: 10,
    },
    iconStyle: {
        fontSize: 25,
        marginBottom: 13,
        color: "black",
        alignSelf: "center",
    },
    inputContainer: {
        flexDirection: "row", // Ensure icons and input box are aligned horizontally
        alignItems: "center", // Center align the content vertically
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        backgroundColor: "#ffffff",
        height: 45, // Consistent height
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 10,
        width: 250, // Fixed width for the search bar
    },
    inputBox: {
        height: '100%', // Ensure the text input takes the full height of the container
        flex: 1, // Allow the input to expand within the container
        paddingLeft: 10,
        fontSize: 18,
        color: 'black',
        backgroundColor: 'transparent', // No background to make it blend with the container
    },
    icon: {
        marginRight: 10, // Space between the icon and the text input
    },
});

export default HeaderMenu;
