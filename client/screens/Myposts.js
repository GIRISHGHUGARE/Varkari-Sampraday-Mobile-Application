import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import FooterMenu from '../components/Menus/FooterMenu'
import axios from 'axios'
import PostCard from '../components/PostCard'

const Myposts = () => {
    //state
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    //get user post
    const getUserPosts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/post/get-user-post");
            setLoading(false);
            setPosts(data?.userPost)
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert(error)
        }
    }

    //initial time
    useEffect(() => {
        getUserPosts();
    }, []);
    return (
        <View style={styles.container}>
            <PostCard posts={posts} myPostScreen={true} />
            {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
        </View>
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
export default Myposts