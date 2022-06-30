import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen.js";
import RegisterScreen from "./app/screens/RegisterScreen.js";
import { useFonts } from "expo-font";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./app/screens/BottomTab.js";
import CreateItemScreen from "./app/screens/CreateItemScreen.js";
import LocationProvider from "./contexts/LocationContext.js";
import UserScreen from "./app/screens/UserScreen.js";
import EndScreen from "./app/screens/EndScreen.js";
import UpdateUserScreen from './app/screens/UpdateUserScreen.js';
import UserProvider from "./contexts/userContext.js";
import  RefreshProvider  from "./contexts/refreshContext.js";

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
    <RefreshProvider>
    <UserProvider>
      <LocationProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
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
