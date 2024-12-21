import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { PostContext } from '../context/postContext';
import FooterMenu from '../components/Menus/FooterMenu'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from "axios"
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

const Post = ({ navigation }) => {
    //global state
    const [posts, setPosts] = useContext(PostContext)
    //local state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    //handle post
    const handlePost = async () => {
        try {
            setLoading(true)
            if (!title) {
                alert("Please add post title")
            }
            if (!description) {
                alert("Please add post description")
            }
            const { data } = await axios.post("/post/create-post", { title, description })
            setLoading(false);
            setPosts([...posts, data?.post])
            alert(data?.message)
            navigation.navigate("Home")
        } catch (error) {
            alert(error.response.data.message || error.message);
            setLoading(false);
            console.log(error);
        }
    }
    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.heading}>Create a post</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder='add post title'
                            placeholderTextColor={"gray"}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder='Share your thoughts...'
                            placeholderTextColor={"gray"}
                            multiline={true}
                            numberOfLines={6}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                    </View>

                </ScrollView>

            </View>
            <View style={{ backgroundColor: "white", justifyContent: "flex-end" }}>
                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <FontAwesome6Icon
                            name="image"
                            style={styles.iconStyle}
                        // color={route.name === "" ? "black" : "gray"}
                        />
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                            <Text style={styles.postBtnText}>
                                Post
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    },
    footerContainer: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'space-between',
        alignItems: "center"
    },
    heading: {
        color: "#812F21",
        fontSize: 25,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    inputBox: {
        backgroundColor: "#ffffff",
        textAlignVertical: "top",
        paddingTop: 10,
        width: 320,
        marginTop: 30,
        fontSize: 16,
        paddingLeft: 15,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10
    },
    postBtn: {
        backgroundColor: "#812F21",
        width: 80,
        height: 45,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    postBtnText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold"
    },
    iconStyle: {
        fontSize: 25,
    }
})
export default Post