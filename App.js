import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen.js";
import RegisterScreen from "./app/screens/RegisterScreen.js";
import { useFonts } from "expo-font";
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./app/screens/BottomTab.js";
import CreateItemScreen from "./app/screens/CreateItemScreen.js";
import LocationProvider from "./contexts/LocationContext.js";
import UserScreen from "./app/screens/UserScreen.js";
import EndScreen from "./app/screens/EndScreen.js";
import UpdateUserScreen from './app/screens/UpdateUserScreen.js';
import UserProvider from "./contexts/userContext.js";
import RefreshProvider from "./contexts/refreshContext.js";
import currentIP from "./app/utils/ip.js";
import axios from "axios";
import { globalStyles, colors } from "./app/styles/globalStyles.js";
import { ActivityIndicator, View, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [expoClientIdValue, setExpoClientIdValue] = useState("");

  useEffect(() => {
    const getExpoClientId = async () => {
      try {
        const ip = await currentIP();
        const result = await axios({
          method: "get",
          url: `http://${ip}:9000/googleSignin`,
        });
        setExpoClientIdValue(result.data);
      } catch (error){
        console.log(error)
      }
  }

  getExpoClientId()
  }, [])
  
  let [fontsLoaded] = useFonts({
    LatoRegular: require("./app/assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./app/assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!expoClientIdValue) {
    return null;
  }

  return (
    <RefreshProvider>
      <UserProvider>
        <LocationProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" >{(props) => <LoginScreen {...props} expoClientIdValue={expoClientIdValue}/>}</Stack.Screen>
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="User" component={UserScreen} />
                <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
                <Stack.Screen name="UploadForm" component={CreateItemScreen} />
                <Stack.Screen name="Main" component={BottomTab} />
                <Stack.Screen name="EndScreen" component={EndScreen} />
              </Stack.Navigator>
            </NavigationContainer>
        </LocationProvider>
      </UserProvider>
    </RefreshProvider>
  );
}
