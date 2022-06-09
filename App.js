import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { colors, globalStyles } from './app/styles/globalStyles.js';
import { useFonts } from 'expo-font';
import { StyleSheet, SafeAreaView } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen.js';
import LoginScreen from './app/screens/LoginScreen.js';
import RegisterScreen from './app/screens/RegisterScreen.js';
import CreateItemScreen from './app/screens/CreateItemScreen.js';
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./app/screens/BottomTab.js";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    LatoRegular: require("./app/assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./app/assets/fonts/Lato-Bold.ttf")
  })

  if (!fontsLoaded) {
    return null;
  }


  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Main" component={BottomTab}/>
      </Stack.Navigator>
    </NavigationContainer>
      



  );
}


//const styles = StyleSheet.create({
  // cont: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  // color: {
  //   backgroundColor: colors.light,
  //   marginTop: 100,
  //   padding: 20,  
  //   borderWidth: 1,
  //   borderColor: "black",
  //   borderRadius: 10,
  // }
// })

