import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen.js';
import LoginScreen from './app/screens/LoginScreen.js';
import RegisterScreen from './app/screens/RegisterScreen.js';
import CreateItemScreen from './app/screens/CreateItemScreen.js';
import MainPageScreen from './app/screens/MainPageScreen.js';



export default function App() {
  return (
    <View style={styles.container}>
      <Text> Hi there beautiful girls! Let the coding begin </Text>
      <StatusBar style="auto" />
    </View>
   
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
