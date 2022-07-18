import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useEffect, useState } from "react";

export const userContext = React.createContext();
let emailDefault;
let emailFromStorage;
let tokenDefault;
let tokenFromStorage;
let userDefault;
let userFromStorage;
let userIdDefault;
let userIdFromStorage;

// get data
const getDataFromAsyncStorage = async () => {
  emailDefault      = emailFromStorage  ? JSON.parse(emailFromStorage)  : null;
  emailFromStorage  = await AsyncStorage.getItem("email");
  tokenDefault      = tokenFromStorage  ? tokenFromStorage              : null;
  tokenFromStorage  = await AsyncStorage.getItem("token");
  userDefault       = userFromStorage   ? JSON.parse(userFromStorage)   : null;
  userFromStorage   = await AsyncStorage.getItem("user");
  userIdDefault     = userIdFromStorage ? JSON.parse(userIdFromStorage) : null;
  userIdFromStorage = await AsyncStorage.getItem("userId");
};

getDataFromAsyncStorage();

export default function UserProvider(props) {
    const [userEmail, setUserEmail]         = useState(emailDefault);
    const [token, setToken]                 = useState(tokenDefault);
    const [user, setUser]                   = useState(userDefault);
    const [currentUserId, setCurrentUserId] = useState(userIdDefault);
    const [userObj, setUserObj]             = useState(null);

  useEffect(() => {
    const setUser = async () => {
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem("user");
      }
    };
  }, [user]);
  useEffect(() => {
    const setUserEmail = async () => {
      if (userEmail) {
        await AsyncStorage.setItem("userEmail", userEmail);
      } else {
        await AsyncStorage.removeItem("userEmail");
      }
    };
  }, [userEmail]);
  useEffect(() => {
    const setToken = async () => {
      if (token) {
        await AsyncStorage.setItem("token", token);
      } else {
        await AsyncStorage.removeItem("token");
      }
    };
  }, [token]);

  const value = {
    currentUserId,
    setCurrentUserId,
    setToken,
    setUser,
    setUserEmail,
    setUserObj,
    token,
    user,
    userEmail,
    userObj,
  };

  return (
    <userContext.Provider value={value}>{props.children}</userContext.Provider>
  );
}
