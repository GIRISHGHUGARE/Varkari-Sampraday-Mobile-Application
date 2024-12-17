import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const InputBox = ({ inputTitle, keyboardType, autoComplete, secureTextEntry, value, setValue }) => {
    return (
        <View>
            <Text style={styles.inputTitle}>{inputTitle}</Text>
            <TextInput
                style={styles.inputBox}
                autoCorrect={false}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 10,
        marginVertical: 10,
        color: 'black',
        fontSize: 18,
        marginBottom: 20,
        backgroundColor: "#ffffff",
        marginTop: 10,
        borderRadius: 10,
    },
    inputTitle: {
        color: "black",
        fontWeight: "bold"
    }
})
export default InputBox