import React from 'react';
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userContext = React.createContext();
let userFromStorage;
let userDefault;
let userIdDefault;
let userIdFromStorage;
let tokenFromStorage;
let tokenDefault;
let emailDefault;
let emailFromStorage

// get data
const getDataFromAsyncStorage = async () => {
     userFromStorage = await AsyncStorage.getItem("user");
     userDefault = userFromStorage ? JSON.parse(userFromStorage) : null;
     userIdFromStorage = await AsyncStorage.getItem("userId");
     userIdDefault = userIdFromStorage ? JSON.parse(userIdFromStorage) : null;
     emailFromStorage = await AsyncStorage.getItem("email");
     emailDefault = emailFromStorage ? JSON.parse(emailFromStorage) : null;
     tokenFromStorage = await AsyncStorage.getItem("token");
     tokenDefault = tokenFromStorage ? tokenFromStorage : null;
};

getDataFromAsyncStorage()

export default function UserProvider(props) {

    const [user, setUser] = useState(userDefault);
    const [token, setToken] = useState(tokenDefault);
    const [userEmail, setUserEmail] = useState(emailDefault)
    const [currentUserId, setCurrentUserId] = useState(userIdDefault)
    const [userObj, setUserObj] = useState(null);


    // console.log("token",token)
    // console.log(user);


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
        const setUserEmail = async () => {
            if (userEmail) {
                await AsyncStorage.setItem("userEmail", userEmail);
            } else {
                await AsyncStorage.removeItem("userEmail");
            }
        }
    }, [userEmail]);
    useEffect( () => {
        const setToken = async () => {
            if (token) {
                await AsyncStorage.setItem("token", token);
            } else {
                await AsyncStorage.removeItem("token");
            }
        }
    }, [token]);

    const value = {user, setUser, token, setToken, userEmail, setUserEmail, currentUserId, setCurrentUserId, setUserObj, userObj};

    return (
        <userContext.Provider value={value}>{props.children}</userContext.Provider>
    )
}
