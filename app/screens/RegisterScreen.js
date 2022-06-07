import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, TextInput, ScrollView, Button, TouchableOpacity, Image } from 'react-native'
import CheckBox from "expo-checkbox";
import googleIcon from "../assets/google.png"
import { globalStyles, colors } from '../styles/globalStyles';


export default function RegisterScreen() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [agree, setAgree] = React.useState(false)

  const handleSignupBtn = () => {
    const url = "";
    const payload = {
      username,
      email,
      password,
      repeatPassword
    }

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }

    fetch(url, config)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(err => console.log(err))

  }

  return (
    <SafeAreaView style={ styles.cont}>
      <ScrollView style={styles.regform}>
        <Text style={[styles.header]}>Garderoba logo</Text>
        <TouchableOpacity 
          onPress={() => {console.log("pressed google button")}}
          style={styles.googleButton}
        >
          <Image 
            source={require("../assets/google.png")}  
            style={{width: 20, height: 20, marginRight: 10}} />
          <Text style={[globalStyles.text, {color: "blue"}]}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={globalStyles.container}>
          <Text style={[globalStyles.text, {marginVertical: 20}]}>or</Text>
          <Text style={globalStyles.text}>Register with email</Text>
        </View>

        <Text style={styles.label}>Name:</Text>
        <TextInput 
          value={username}
          style={styles.textInput}
          onChangeText={(username) =>{
            console.log(username)
             setUsername(username)
          }}

        ></TextInput>

        <Text style={styles.label}>Email:</Text>
        <TextInput 
          value={email}
          onChangeText={(email) => {
            console.log(email)
            setEmail(email)
          }}
          style={styles.textInput}
        ></TextInput>

        <Text style={styles.label}>Password:</Text>
        <TextInput 
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.textInput}
        ></TextInput>

        <Text style={styles.label}>Repeat password:</Text>
        <TextInput 
          value={repeatPassword}
          onChangeText={(repeatPassword) => {
            console.log(repeatPassword)
            setRepeatPassword(repeatPassword)
          }}
          style={styles.textInput}
        ></TextInput>

        <View style={styles.checkboxConWrapper}>
          <CheckBox     
          value={agree}
          onValueChange={() => setAgree(!agree)}
          style={{marginRight: 10}}
           />
          <Text style={{width: "90%"}}>I have read and agreed with the terms and conditions</Text>
        </View>

        <TouchableOpacity 
          onPress={handleSignupBtn}
          disabled={!agree}
          style={agree ? styles.registerButton : styles.unregisterButton}


        ><Text style={styles.textBtn}>Sign up</Text></TouchableOpacity >

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: "center",
    alignItems: "center"
  },
  regform: {
    width: "70%"
  },
  header: {
    fontSize: 28,
    padding: "10%",
    borderWidth: 2,
    marginTop: "5%"
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 4,
    padding: 20,
    marginTop: "5%",
    alignSelf: "center"
  },
  label: {
    paddingTop: 20,
    marginBottom: 5,
    fontSize: 14
  },
  textInput: {
    borderWidth: 1.2,
    paddingHorizontal: 2,
    paddingVertical: 7,
    fontSize: 16,
    borderRadius: 4,
  },
  checkboxConWrapper: {
    flexDirection: 'row',
    paddingTop: 20,
    marginBottom: 5,
    fontSize: 14
  },
  registerButton: {
    alignSelf: "center",
    width: "60%" ,
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: colors.black,
    marginTop: 30,
    marginBottom: 30 
  }, 
  unregisterButton: {
    backgroundColor: "lightgray",     
    alignSelf: "center",
    width: "60%" ,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  textBtn: {
    fontSize: 18,
    color: colors.white
  }
})