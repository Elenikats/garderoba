import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, {useContext, useState} from 'react'
import Logo from '../assets/Logo.png'
import { Link } from '@react-navigation/native';
import currentIP from "../utils/ip.js";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { globalStyles, colors } from '../styles/globalStyles';
import { userContext } from '../../contexts/userContext';


export default function LoginScreen({navigation}) {
  const {user, setUser, token, setToken, setUserEmail, currentUserId, setCurrentUserId, userObj, setUserObj} = useContext(userContext);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [hidePassword, setHidePassword] = useState(true)

  const handleOpenEye = () => {
    setHidePassword(!hidePassword)
  }
    
  const handleLogin = async () => {

    // login emails to use:
    // { email: "baba123@gmail.com", password: "kanmio123" }
    // { email: "angela.h@web.de", password: "123456" }
    // {email: "cabbage@gmail.com",password: "cabbage"}
  // {email: "testuser1@example.com",password: "random"}
    
   
    const ip = await currentIP()

    const url = `http://${ip}:9000/users/login`;
    try {
      const res = await axios.post(url, {
        // email,        
        // password,
        // email: "baba123@gmail.com", 
        // password: "kanimo123" 
        // email: "testuser1@example.com",
        // password: "random"
        // email: "la@gmail.com",
        // password: "123456"
        email: "latifah44@email.com",
        password: "123456"
      });

      setUserObj(res.data)
      setUser(res.data.username);
      setToken(res.data.token);
      setUserEmail(res.data.email)
      setCurrentUserId(res.data._id)

      navigation.navigate("Main");
    } catch (error) {
      console.log("error in login", error);
      alert(error?.response?.data?.error || "Login failed, try again");
    }
  };

  return (
    <View>
      <View>
        <View  style={styles.cont}>
          <Image
          source={Logo} 
          style={styles.logo}/>
            
          <TouchableOpacity 
            onPress     = {() => {
              console.log("pressed google button")
            }}
            style       = {styles.googleButton}>

            <Image 
            source      = {require("../assets/googleIcon.png")}
            style       = {{width: 20, height: 20, marginRight: 10}} />

            <Text style = {[globalStyles.text, {color: "blue"}]}>
              Login with Google
            </Text>
          </TouchableOpacity>
          

          <Text style = {[globalStyles.text, {marginVertical: 30}]}>or</Text>

          <TextInput 
          style          = {styles.textInput}
          placeholder    = "Enter email"
          value          = {email}
          autoCapitalize = "none"
          autoComplete   = "off"
          onChangeText   = {(email) => {
            setEmail(email)
          }} />
                      
          {/* <Text style={styles.label}>Password</Text> */}
          <View style         = {styles.passCont}>
            <TextInput 
              value           = {password}
              placeholder     = "Enter password"
              onChangeText    = {(text) => setPassword(text)}
              style           = {[styles.textInput, {position: "relative"}]}
              autoCapitalize  = "none"
              autoComplete    = "off"
              secureTextEntry = {hidePassword}>
            </TextInput>

            {
            hidePassword ? 
            <Icon 
            name        = "eye-off"solid style={styles.pswIcon}
            onPress     = {handleOpenEye}/>
            : 
            <Icon 
            name        = "eye"
            solid style = {styles.pswIcon}
            onPress     = {handleOpenEye}/>
              }
          </View>


          <TouchableOpacity 
            style     = {styles.loginButton}
            onPress   = {handleLogin}>

            <Text 
              style   = {styles.textBtn}>
              Login
            </Text>

          </TouchableOpacity>

          <View style = {styles.links}>

            <Link 
              to          = {{screen: 'Register'}}
              style       = {styles.signup }>
              Sign up
            </Link>

            <Link 
              to          = {{screen: ''}}
              style       = {styles.forgotPass }>
              Forgot password?
            </Link>

          </View>

        </View>
     </View>
   </View>
 )
};

const styles = StyleSheet.create({
  cont               : {
  justifyContent     : "center",
  alignItems         : "center",
  width              : "70%",
  alignSelf          : "center"
  },
  logo               : {
  marginBottom       : "20%",
  marginTop          : 50,
  borderRadius       : 50,
  width              : 100,
  height             : 100
  },
  links              : {
  flexDirection      : "row",
  marginTop          : "10%",
  },
  signup             : {
  marginRight        : "18%",
  color              : "blue"
  },
  forgotPass         : {
  color              : "blue"
  },
  googleButton       : {
  flexDirection      : "row",
  alignItems         : "center",
  borderWidth        : 1,
  borderColor        : "blue",
  borderRadius       : 4,
  padding            : 20,
  marginTop          : "10%",
  alignSelf          : "center"
  },
  label              : {
  paddingTop         : 10,
  marginBottom       : 5,
  fontSize           : 14,
  alignSelf          : "flex-start",
  },
  textInput          : {
  width              : "100%",
  borderWidth        : 1,
  borderColor        : "#bbb",
  paddingHorizontal  : 8,
  paddingVertical    : 10,
  fontSize           : 14,
  borderRadius       : 5,
  marginTop          : 12,
  },
  passCont           : {
  position           : "relative",
  width              : "100%",
  justifyContent     : "center",

  },
  checkboxConWrapper : {
  flexDirection      : 'row',
  alignSelf          : "flex-start",
  paddingTop         : 20,
  marginBottom       : 5,
  fontSize           : 14
  },
  loginButton        : {
  alignSelf          : "center",
  width              : "60%" ,
  borderWidth        : 2,
  borderRadius       : 50,
  padding            : 10,
  alignItems         : "center",
  justifyContent     : 'center',
  backgroundColor    : colors.black,
  marginTop          : 30,
  marginBottom       : 30
  }, 
  unregisterButton   : {
  backgroundColor    : "lightgray",
  alignSelf          : "center",
  width              : "60%" ,
  borderWidth        : 2,
  borderColor        : "lightgray",
  borderRadius       : 50,
  padding            : 10,
  alignItems         : "center",
  justifyContent     : 'center',
  marginTop          : 30,
  marginBottom       : 30
  },
  textBtn            : {
  fontSize           : 18,
  color              : colors.white
  },
  pswIcon            : {
  position           : "absolute",
  alignSelf          : "flex-end",
  bottom             : 14,
  right              : 12,
  color              : "gray",
  fontSize           : 18
  },
  errorMessage       : {
  alignSelf          : "flex-start",
  color              : "red",
  paddingTop         : 3,
  fontSize           : 12
  }
})
