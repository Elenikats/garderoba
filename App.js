import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/WelcomeScreen.js';
import LoginScreen from './app/screens/Login&Button/LoginScreen.js';
import LoginButton from './app/screens/Login&Button/LoginButton.js';
import RegisterScreen from './app/screens/RegisterScreen.js';
import CreateItemScreen from './app/screens/CreateItemScreen.js';
import MainPageScreen from './app/screens/MainPageScreen.js';



const Stack= createNativeStackNavigator()
export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* <Stack.Screen name="Main" component={BottomTab} /> */}
      </Stack.Navigator>
    </NavigationContainer>

  //   <View style={{flex:1}}>
  //     <LoginScreen />
  //   </View>
   );
}




