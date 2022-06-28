import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity } from 'react-native'
import React, {useContext, useState} from 'react'
import Logo from '../assets/Logo.png'
import { Link } from '@react-navigation/native';
import {globalStyles} from '../styles/globalStyles.js'
import currentIP from "../utils/ip.js";
import axios from "axios";
import { userContext } from '../../contexts/userContext';


export default function LoginScreen({navigation}) {
  const {user, setUser, token, setToken} = useContext(userContext);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
    

  const handleLogin = async () => {
   

    const ip = await currentIP()
    console.log("ip:", ip);

    const url = `http://${ip}:9000/users/login`;
    try {
      const res = await axios.post(url, { email: "baba123@gmail.com", password: "monika" });
      console.log("res data:", res.data);
      setUser(res.data.username);
      setToken(res.data.token);
      navigation.navigate("Main");
     
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.error || "Login failed, try again");
    }

  }
  
  return (
    
      
    <View  style={styles.cont}>

      
      <Image
      source={Logo} 
      style={styles.logo}/>
      

      
      <TouchableOpacity 
            onPress={() => {console.log("pressed google button")}}
            style={styles.googleButton}
          >
            <Image 
              source={require("../assets/googleIcon.png")}  
              style={{width: 20, height: 20, marginRight: 10}} />
            <Text style={[globalStyles.text, {color: "blue"}]}>Sign in with Google</Text>
          </TouchableOpacity>
      

      <Text style={styles.midHeader}>or</Text>

      <View style={styles.inputCont}>
      <Text style={styles.label}>Email</Text>
      <TextInput 
      value={email}
      autoCapitalize="none"
      onChangeText={(email) => {
        console.log(email)
        setEmail(email)
      }}
      style={styles.textInput}
      />
     


      
      <Text style={styles.label}>Password</Text>
      <TextInput 
      value={password}
      autoCapitalize="none"
      onChangeText={(password) => setPassword(password)}
      style={styles.textInput}/>

      </View>

      <Button 
      style={styles.LoginButton} 
      title="Login"
      onPress={handleLogin}/>

     <View style={styles.links}>

      <Link to={{screen: 'Register'}} style={styles.signup }>Sign up</Link>
      <Link to={{screen: ''}} style={styles.forgotPass }>Forgot password?</Link>
     </View>

        

    </View>
  )  
   
}

const styles = StyleSheet.create({
  cont: {
    flex:1,
    justifyContent: 'center',
    alignItems: "center",
    
  
  },
  inputCont: {
    padding: "10%",
    justifyContent: "space-between",
  },
  logo: {
    marginBottom: "20%",
    borderRadius: 50,
    width: 80,
    height: 80
  },
  googleButton: {
    
  },
  midHeader: {
    marginTop: "15%"
  },
  label: {
    
  },
  LoginButton: {
   
  },
  textInput: {
  borderWidth: 1.2,
   width: 188,
   height: 35,
  },
  links: {
    flexDirection: "row",
    marginTop: "10%",
   
  },
  signup: {
    marginRight: "18%"
  }
})
