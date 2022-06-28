import react, {useState} from "react";
import currentIP from "../utils/ip.js";
import {View, Text, TextInput, Button} from "react-native"
import { NavigationHelpersContext } from "@react-navigation/native";


export default function UpdateUserScreen(navigation) {

    function submitChanges() {
        navigation.navigate("User")
      }
      
      return (
        <View>
        <Text> You've made it to settings</Text>
        <TextInput>Username</TextInput>
        <TextInput>Email</TextInput>
        <TextInput>Input</TextInput>
        <TextInput>Input</TextInput>
        </View>
      );
}
