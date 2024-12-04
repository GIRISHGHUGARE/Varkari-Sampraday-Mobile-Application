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

    // Set the base URL for Axios
    axios.defaults.baseURL = "http://10.0.98.54:8080/api/v1";

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

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
