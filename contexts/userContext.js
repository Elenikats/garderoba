import React from 'react';
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userContext = React.createContext();
let userFromStorage;
let userDefault;
let tokenFromStorage;
let tokenDefault;

// get data
const getDataFromAsyncStorage = async () => {
     userFromStorage = await AsyncStorage.getItem("user");
     console.log("async storage", AsyncStorage);
     userDefault = userFromStorage ? JSON.parse(userFromStorage) : null;

     tokenFromStorage = await AsyncStorage.getItem("token");
     tokenDefault = tokenFromStorage ? tokenFromStorage : null;
}

getDataFromAsyncStorage()



export default function UserProvider(props) {

    const [user, setUser] = useState(userDefault);
    const [token, setToken] = useState(tokenDefault);
    const [userObj, setUserObj] = useState(null)

    console.log("token",token)


    // this stores the login to AsyncStorage in JSON format. The useEffect will update when [.. ] changes. WE SEND DATA
    useEffect( () => {
        const setUser = async () => {
            if (user) {
                await AsyncStorage.setItem("user", JSON.stringify(user));
             } else {
                await AsyncStorage.removeItem("user");
             }
        }
    }, [user]);

    useEffect( () => {
        const setToken = async () => {
            if (token) {
                await AsyncStorage.setItem("token", token);
            } else {
                await AsyncStorage.removeItem("token");
            }
        }
    }, [token]);

    const value = {user, setUser, token, setToken, userObj, setUserObj};

    return (
        <userContext.Provider value={value}>{props.children}</userContext.Provider>
    )
}