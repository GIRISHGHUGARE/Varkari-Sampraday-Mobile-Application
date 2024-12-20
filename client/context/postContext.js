import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get("/post/get-all-post");
            setLoading(false);
            setPosts(data?.post);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching posts:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);


    return (
        <PostContext.Provider value={[posts, setPosts, getAllPosts, loading]}>
            {children}
        </PostContext.Provider>
    );
}

export { PostContext, PostProvider };
