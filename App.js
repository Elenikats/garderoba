import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screens/Login&Button/LoginScreen.js';
import RegisterScreen from './app/screens/RegisterScreen.js';
import { useFonts } from 'expo-font';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./app/screens/BottomTab.js";


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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
