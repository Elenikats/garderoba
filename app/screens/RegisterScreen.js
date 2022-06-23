import React, { useState } from 'react'
import { SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Text, View  } from 'react-native'
import CheckBox from "expo-checkbox";
import { globalStyles, colors } from '../styles/globalStyles';
import Icon from "react-native-vector-icons/Ionicons";
//import * as Network from "expo-network";
import currentIP from "../utils/ip.js";

export default function RegisterScreen({navigation}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agree, setAgree] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [errors, setErrors] = useState([])

  const handleOpenEye = () => {
    setHidePassword(!hidePassword)
  }

  const handleSignupBtn = async () => {


    // const ip = await Network.getIpAddressAsync();
    const ip = await currentIP()
    console.log("ip:", ip);

    const url = `http://${ip}:9000/users/signup`;
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
      .then(result => {
        // console.log(result.error)
        // console.log("status:", result.status)
        // console.log("ok", result.ok)
        // console.log("result:", result)
        if (result.error) {
          throw new Error(result.error)
        }
        navigation.navigate('Main')
      })
      .catch(err => {
        setErrors(err)
        console.log("errError:", err)
      })
  }

  console.log("errors:", errors)

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
            <Text style={[globalStyles.text, {marginBottom: 14}]}>Register with email</Text>
          </View>


          
          {/* <Text style={styles.label}>Name:</Text> */}

          {/* { errors.includes("username") && <Text>username is too short</Text> } */}
          <TextInput 
            value={username}
            placeholder="Enter username"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setUsername(text)}
            
          ></TextInput>

          {/* <Text style={styles.label}>Email:</Text> */}
          {/* { errors.includes("email") && <Text>email is invalid</Text> } */}
          
          <TextInput 
            value={email}
            placeholder="Enter email"
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
            keyboardType={"email-address"}
            autoCapitalize="none"
          ></TextInput>

          {/* <Text style={styles.label}>Password:</Text> */}
         
          <TextInput 
            value={password}
            placeholder="Enter password"
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={hidePassword}
          ></TextInput>
          {hidePassword ? <Icon name="eye-off"solid style={styles.pswIcon} onPress={handleOpenEye}/> : <Icon name="eye"solid style={styles.pswIcon} onPress={handleOpenEye}/>}
        
          

          {/* <Text style={styles.label}>Repeat password:</Text> */}
      
          <TextInput 
            value={repeatPassword}
            placeholder="Repeat password"
            autoCapitalize="none"
            onChangeText={(text) => setRepeatPassword(text)}
            style={styles.textInput}
            secureTextEntry={hidePassword}
          ></TextInput>
          {hidePassword ? <Icon name="eye-off"solid style={styles.repeatPswIcon} onPress={handleOpenEye}/> : <Icon name="eye"solid style={styles.repeatPswIcon} onPress={handleOpenEye}/>}

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
            style={agree ? styles.registerButton : styles.unregisterButton}>
              <Text style={styles.textBtn}>Sign up</Text>
          </TouchableOpacity >
          
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
    borderWidth: 1,
    borderColor: "#bbb",
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14,
    borderRadius: 5,
    marginTop: 12,
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
  },
  pswIcon: {
    position: "absolute",
    bottom: 225,
    right: 10,
    fontSize: 17
  },
  repeatPswIcon: {
    position: "absolute",
    bottom: 175,
    right: 10,
    fontSize: 17
  }
})