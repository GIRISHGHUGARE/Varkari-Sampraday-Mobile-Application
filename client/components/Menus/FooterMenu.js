import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const FooterMenu = () => {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome5Icon
                    name="home"
                    style={styles.iconStyle}
                    color={route.name === "Home" ? "black" : "gray"}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Book')}>
                <FontAwesome6Icon
                    name="book-open"
                    style={styles.iconStyle}
                    color={route.name === "Book" ? "black" : "gray"}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <FontAwesome6Icon
                    name="circle-plus"
                    style={styles.iconStyle}
                    color={route.name === "Post" ? "black" : "gray"}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Product')}>
                <FontAwesome6Icon
                    name="cart-shopping"
                    style={styles.iconStyle}
                    color={route.name === "Product" ? "black" : "gray"}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <FontAwesome5Icon
                    name="user-alt"
                    style={styles.iconStyle}
                    color={route.name === "Account" ? "black" : "gray"}
                />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 20,
        justifyContent: 'space-between',
    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: "center",
        fontSize: 25,
    }
})
export default FooterMenu