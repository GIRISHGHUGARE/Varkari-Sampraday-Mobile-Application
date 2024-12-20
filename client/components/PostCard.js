import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import moment from "moment";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import EditModal from './EditModal';

const PostCard = ({ posts, myPostScreen }) => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [post, setPost] = useState({});
    const navigation = useNavigation();
    //handle delete post
    const handleAlertDeletePost = (id) => {
        Alert.alert("Attention!", "Are you sure you want to delete the post?",
            [
                {
                    text: "Cancel",
                    onPress: () => { console.log("Cancel button pressed") }
                },
                {
                    text: "Delete",
                    onPress: () => handleDeletePost(id)
                },
            ]
        )
    }

    //delete post
    const handleDeletePost = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`/post/delete-post/${id}`)
            setLoading(false);
            alert(data?.message);
            navigation.push("Myposts")
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert(error)
        }
    }
    return (
        <>
            <View>
                <Text style={styles.heading}>Total Posts {posts?.length}</Text>
                {myPostScreen && (
                    <EditModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        post={post}
                    />
                )}
                {posts?.map((posts, i) => (
                    <View style={styles.card} key={i}>
                        {myPostScreen && (
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Text>
                                    <FontAwesome5
                                        name="edit"
                                        color={""}
                                        size={16}
                                        onPress={() => { setPost(posts), setModalVisible(true); }}
                                    />
                                </Text>
                                <Text style={{ marginHorizontal: 20 }}>
                                    <FontAwesome5
                                        name="trash"
                                        color={"red"}
                                        size={16}
                                        onPress={() => handleAlertDeletePost(posts?._id)}
                                    />
                                </Text>
                            </View>
                        )}
                        <Text style={styles.title}>Title : {posts?.title}</Text>
                        <Text style={styles.desc}>Description : {posts?.description}</Text>
                        <View style={styles.footer}>
                            {posts?.postedBy?.name && (<Text>
                                <FontAwesome5
                                    name="user"
                                />
                                {" "}
                                {posts?.postedBy?.name}
                            </Text>)}
                            <Text>
                                <FontAwesome5
                                    name="clock"
                                />
                                {" "}
                                {moment(posts?.createdAt).format("DD:MM:YYYY")}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: "green",
        textAlign: "center"
    },
    card: {
        width: "97%",
        backgroundColor: "white",
        borderWidth: 0.2,
        borderColor: "gray",
        padding: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 10,
        borderBottomWidth: 0.3
    },
    desc: {
        marginTop: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },
})
export default PostCard