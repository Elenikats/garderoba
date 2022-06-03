import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { colors, globalStyles } from './app/styles/globalStyles.js';
import WelcomeScreen from './app/screens/WelcomeScreen.js';
import LoginScreen from './app/screens/LoginScreen.js';
import RegisterScreen from './app/screens/RegisterScreen.js';
import CreateItemScreen from './app/screens/CreateItemScreen.js';
import MainPageScreen from './app/screens/MainPageScreen.js';
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';


export default function App() {
  let [fontsLoaded, error] = useFonts({
    LatoRegular: require("./app/assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./app/assets/fonts/Lato-Bold.ttf")
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[globalStyles.container, globalStyles.body]}>
      <Text > Hi there beautiful girls! Let the coding begin </Text>

      <Text style={[globalStyles.text, styles.color]} > Hi there beautiful girls! Let the coding begin </Text>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  color: {
    backgroundColor: colors.light,
    padding: 20
  }
})

