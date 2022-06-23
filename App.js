import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/Login&Button/LoginScreen.js";
import RegisterScreen from "./app/screens/RegisterScreen.js";
import { useFonts } from "expo-font";
import * as React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./app/screens/BottomTab.js";
import CreateItemScreen from "./app/screens/CreateItemScreen.js";
import LocationProvider from "./contexts/LocationContext.js";
import ImageBoxesProvider from "./contexts/ImageBoxesContext.js";
import UserScreen from "./app/screens/UserScreen.js";
import EndScreen from "./app/screens/EndScreen.js";
import UserProvider from "./contexts/userContext.js";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    LatoRegular: require("./app/assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./app/assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <LocationProvider>
        <ImageBoxesProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="User" component={UserScreen} />
              <Stack.Screen name="UploadForm" component={CreateItemScreen} />
              <Stack.Screen name="Main" component={BottomTab} />
            <Stack.Screen name="EndScreen" component={EndScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ImageBoxesProvider>
      </LocationProvider>
    </UserProvider>
  );
}
