import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const SubmitButton = ({ handleSubmit, btnTitle }) => {
    return (
        <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.btnText}>{btnTitle}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitBtn: {
        backgroundColor: "#7464bc",
        height: 50,
        marginHorizontal: 25,
        borderRadius: 80,
        justifyContent: "center",
        marginBottom: 20
    },
    btnText: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 24,
        fontWeight: "400"
    }
})
export default SubmitButton