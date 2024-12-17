import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'
import { AuthContext } from '../context/authContext'
import { PostContext } from '../context/postContext'
import FooterMenu from '../components/Menus/FooterMenu'
import PostCard from '../components/PostCard'

const Home = () => {
    const [posts, getAllPosts, loading] = useContext(PostContext);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getAllPosts(); // Fetch new posts
        setRefreshing(false);  // Stop refreshing once data is fetched
    }, [getAllPosts]);


    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <PostCard posts={posts} />
                {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
            </ScrollView>
            <View style={{ backgroundColor: "#ffffff" }}>
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
    }
})
export default Home