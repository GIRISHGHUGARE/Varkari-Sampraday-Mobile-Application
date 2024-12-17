import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // global state
    const [state, setState] = useState({
        user: null,
        token: "",
    });



    useEffect(() => {
        const loadLocalStorageData = async () => {
            try {
                let data = await AsyncStorage.getItem('@auth');
                if (data) {
                    let loginData = JSON.parse(data);
                    setState({
                        user: loginData?.user,
                        token: loginData?.token,
                    });
                }
            } catch (error) {
                console.log("Error loading data from AsyncStorage:", error);
            }
        };
        loadLocalStorageData();
    }, []);

    let token = state && state.token
    // Set the base URL for Axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    axios.defaults.baseURL = "http://192.168.0.114:8080/api/v1";

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
