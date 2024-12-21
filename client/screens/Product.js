import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import FooterMenu from '../components/Menus/FooterMenu'

const Product = () => {
    return (
        <>
            <View style={styles.container}>
                <Text>Product</Text>

            </View>
            <View style={{ justifyContent: "flex-end", backgroundColor: "#ffffff" }}>
                <FooterMenu />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        marginTop: 40
    }
})
export default Product