import React, { useState } from 'react'
import { SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Text, View  } from 'react-native'
import CheckBox from "expo-checkbox";
import { globalStyles, colors } from '../styles/globalStyles';

export default function RegisterScreen({navigation}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agree, setAgree] = useState(false)

  const handleSignupBtn = () => {

    navigation.navigate('Main')

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
    <SafeAreaView>
      <ScrollView>
        <View style={ styles.cont }>
        <Image 
            source={require("../assets/clothespile.jpg")}  
            style={{width: 100, height: 100, borderRadius: 50, marginTop: 50}} />
        <TouchableOpacity 
          onPress={() => {console.log("pressed google button")}}
          style={styles.googleButton}
        >
          <Image 
            source={require("../assets/googleIcon.png")}  
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
          keyboardType={"email-address"}
        ></TextInput>

        <Text style={styles.label}>Password:</Text>
        <TextInput 
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.textInput}
          secureTextEntry={true}
        ></TextInput>

        <Text style={styles.label}>Repeat password:</Text>
        <TextInput 
          value={repeatPassword}
          onChangeText={(repeatPassword) => {
            console.log(repeatPassword)
            setRepeatPassword(repeatPassword)
          }}
          style={styles.textInput}
          secureTextEntry={true}c
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
        
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center"
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 4,
    padding: 20,
    marginTop: "10%",
    alignSelf: "center"
  },
  label: {
    paddingTop: 10,
    marginBottom: 5,
    fontSize: 14,
    alignSelf: "flex-start",
  },
  textInput: {
    width: "100%",
    borderWidth: 1.2,
    paddingHorizontal: 2,
    paddingVertical: 7,
    fontSize: 16,
    borderRadius: 5,
  },
  checkboxConWrapper: {
    flexDirection: 'row',
    alignSelf: "flex-start",
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