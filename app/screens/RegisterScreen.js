import React, { useContext, useState } from 'react'
import { SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, Text, View  } from 'react-native'
import CheckBox from "expo-checkbox";
import { globalStyles, colors } from '../styles/globalStyles';
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from '@react-navigation/native';
import currentIP from "../utils/ip.js";
import { userContext } from '../../contexts/userContext';

export default function RegisterScreen({navigation}) {
  const {setUser, setToken, setUserEmail} = useContext(userContext);
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
        if (result.error) {
         throw new Error(result.error) 
        }
        setUser(result.username);
        setToken(result.token);
        setUserEmail(result.email)

        navigation.navigate('Main')
        
      })
      .catch(err => {
        setErrors(err)
        //alert(err?.response?.data?.error || "Login failed, please try again");
        
      })
  }

  return (
    <SafeAreaView style={styles.bigCont}>
      <ScrollView>
        <View style={ styles.cont }>
          <Image source={require("../assets/Garderoba-150.png")} style={styles.logo} />
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
            autoComplete="off"
            onChangeText={(text) => setUsername(text)}
            
          ></TextInput>

          { errors && errors.message && errors.message.includes("username-invalid") && <Text style={styles.errorMessage}>The username can contain only letters, numbers and characters like -_.</Text>}
          { errors && errors.message && errors.message.includes("duplicate key") && errors.message.includes("username") && <Text style={styles.errorMessage}>This username is already being used.</Text>}



          {/* <Text style={styles.label}>Email:</Text> */}
          {/* { errors.includes("email") && <Text>email is invalid</Text> } */}

          
          <TextInput 
            value={email}
            placeholder="Enter email"
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
            keyboardType={"email-address"}
            autoCapitalize="none"
            autoComplete="off"
          ></TextInput>

          { errors && errors.message && errors.message.includes("email-invalid") && <Text style={styles.errorMessage}>The email is not valid.</Text>}
          { errors && errors.message && errors.message.includes("duplicate key") && errors.message.includes("email") && <Text style={styles.errorMessage}>An account already exists with this email.</Text>}

          {/* <Text style={styles.label}>Password:</Text> */}
         
         <View style={styles.passCont}>
          <TextInput 
            value={password}
            placeholder="Enter password"
            onChangeText={(text) => setPassword(text)}
            style={[styles.textInput, {position: "relative"}]}
            autoCapitalize="none"
            autoComplete="off"
            secureTextEntry={hidePassword}
          ></TextInput>

          {hidePassword ? <Icon name="eye-off"solid style={styles.pswIcon} onPress={handleOpenEye}/> : <Icon name="eye"solid style={styles.pswIcon} onPress={handleOpenEye}/>}
          </View>

          { errors && errors.message && errors.message.includes("password-too-short") && <Text style={styles.errorMessage}>The password is too short (min 6 characters).</Text>}
          { errors && errors.message && errors.message.includes("password-too-long") && <Text style={styles.errorMessage}>The password is too long (max 20 characters).</Text>}
        
          

          {/* <Text style={styles.label}>Repeat password:</Text> */}
      
          <TextInput 
            value={repeatPassword}
            placeholder="Repeat password"
            autoCapitalize="none"
            autoComplete="off"
            onChangeText={(text) => setRepeatPassword(text)}
            style={styles.textInput}
            secureTextEntry={hidePassword}
          ></TextInput>
          { password !== repeatPassword && <Text style={styles.errorMessage}>The passwords don't match.</Text>}
          

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
            style={username && email && password && repeatPassword && agree ? styles.registerButton : styles.unregisterButton}>
              <Text style={styles.textBtn}>Sign up</Text>
          </TouchableOpacity >

          <View style={styles.linksCont}>
            <Text>Already have an account?</Text>
            <Link to={{screen: 'Login'}} style={styles.link}>Login</Link>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bigCont: {
    backgroundColor: "white",
    flex: 1
  },
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
    padding: 17,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "100%"
  },
  logo: {
    marginBottom: "10%",
    marginTop: 50
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
  passCont: {
    position: "relative",
    width: "100%",
    justifyContent: "center",

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
    alignSelf: "flex-end",
    bottom: 14,
    right: 12,
    color: "gray",
    fontSize: 18
  },
  repeatPswIcon: {
    position: "absolute",
    bottom: 175,
    right: 10,
    fontSize: 17
  },
  errorMessage: {
    alignSelf: "flex-start",
    color: "red",
    paddingTop: 3,
    fontSize: 12
  },
  linksCont: {
    flexDirection: "row"
  },
  link: {
    marginBottom: 50,
    marginLeft: 10,
    color: "blue"
  }
})