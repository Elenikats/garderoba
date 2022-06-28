import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import Logo from '../assets/Logo.png';
import { Link } from '@react-navigation/native';
import {globalStyles} from '../styles/globalStyles.js';


export default function LoginScreen({navigation}) {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
    

  function handleLogin() {
    navigation.navigate("Main")
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
          {/* <Image 
            style={styles.googleLogo}
            source={require("")}  
          />  */}
          <Text style={[globalStyles.text, {color: "blue"}]}>Log in with Google</Text>
        </TouchableOpacity>
       

      <Text style={styles.midHeader}>or</Text>

      <View style={styles.inputCont}>
      <Text style={styles.label}>Email</Text>
      <TextInput 
      value={email}
      onChangeText={(email) => {
        console.log(email)
        setEmail(email)
      }}
      style={styles.textInput}
      />
     


      
      <Text style={styles.label}>Password</Text>
      <TextInput 
      value={password}
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
  googleLogo: {
    backgroundColor: "green",
    marginRight: 3,
    borderRadius: 50,
    width: 80,
    height: 80
  },
  googleButton: {
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 4,
    flexDirection: "row",
    
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
    marginRight: "18%",
    color: "blue"

  },
  forgotPass: {
    color: "blue"
  }
})