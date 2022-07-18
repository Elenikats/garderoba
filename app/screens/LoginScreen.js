import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "@react-navigation/native";
import currentIP from "../libs/ip.js";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { globalStyles, colors } from "../styles/globalStyles";
import { userContext } from "../../contexts/UserContext";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation, expoClientIdValue }) {
  const {setUser, setToken, setUserEmail, setCurrentUserId, setUserObj} = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [message,setMessage] = useState();


  // calling google auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: expoClientIdValue
  });

  useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    async function getUserData() {
      let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}`}
      });
      userInfoResponse.json().then(data => {
        setUserInfo(data);
        console.log("data",data);
      });
    }
    getUserData()
  }, [accessToken])

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    navigation.navigate("Main");
  }, [userInfo])

  const handleOpenEye = () => {
    setHidePassword(!hidePassword);
  };

  const handleLogin = async () => {
    const ip = await currentIP();

    const url = `http://${ip}:9000/users/login`;
    try {
      const res = await axios.post(url, {
        email: "rauliveera@joelshouse.de",
        password: "rauliveera",
        // email: "testuser1@example.com",
        // password:"random",
        // email: "angela.h@web.de",
        // password: "123456",
        // email: "testuser3@eg.com",password: "random321"
        // email,        
        // password,
        // email: "baba123@gmail.com", 
        // password: "kanimo123" 
        // email: "testuser1@example.com",
        // password: "random"
        // email: "la@gmail.com",
        // password: "123456"
        // email: "latifah44@email.com",
        // password: "123456"
      });

      setUserObj(res.data);
      setUser(res.data.username);
      setToken(res.data.token);
      setUserEmail(res.data.email);
      setCurrentUserId(res.data._id);
      navigation.navigate("Main");

    } catch (error) {
      console.log("error in login", error);
      alert(error?.response?.data?.error || "Login failed, try again");
    }
  };

  return (
    <SafeAreaView style={styles.bigCont}>
      <ScrollView>

        <View style={styles.cont}>
        
        <View style={styles.logoCont}>
          <Image source={require("../assets/Garderoba-150.png")} style={styles.logo} />
          </View>

          <TouchableOpacity
            onPress={ () => { promptAsync({ useProxy: true, redirectUri: AuthSession.makeRedirectUri({useProxy: true}) , showInRecents: true }) }}
            style={styles.googleButton}
          >
            <Image
              source={require("../assets/googleIcon.png")}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            <Text style={[globalStyles.text, { color: "blue" }]}>
              Login with Google
            </Text>
          </TouchableOpacity>
          <Text style={[globalStyles.text, { marginVertical: 30 }]}>or</Text>
          <Text style={[globalStyles.text, { marginVertical: 10 }]}>Register with email</Text>
          <TextInput
            value={email}
            autoCapitalize="none"
            placeholder="Enter email"
            autoComplete="off"
            onChangeText={(email) => {
              setEmail(email);
            }}
            style={styles.textInput}
          />
          <View style={styles.passCont}>
            <TextInput
              value={password}
              placeholder="Enter password"
              onChangeText={(text) => setPassword(text)}
              style={[styles.textInput, { position: "relative" }]}
              autoCapitalize="none"
              autoComplete="off"
              secureTextEntry={hidePassword}
            ></TextInput>
            {hidePassword ? (
              <Icon
                name="eye-off"
                solid
                style={styles.pswIcon}
                onPress={handleOpenEye}
              />
            ) : (
              <Icon
                name="eye"
                solid
                style={styles.pswIcon}
                onPress={handleOpenEye}
              />
            )}
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.textBtn}>Login</Text>
          </TouchableOpacity>
          <View style={styles.linksCont}>
          <Text>Don't have an account yet?</Text>
            <Link to={{ screen: "Register" }} style={styles.signup}>Sign up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
  logo: {
    marginBottom: "10%",
    marginTop: 50
  },
  linksCont: {
    flexDirection: "row",
    marginTop: "10%"
  },
  signup: {
    color: "blue",
    marginLeft: 10
  },
  forgotPass: {
    color: "blue",
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
  passCont: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  checkboxConWrapper: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingTop: 20,
    marginBottom: 5,
    fontSize: 14,
  },
  loginButton: {
    alignSelf: "center",
    width: "60%",
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    marginTop: 30,
    marginBottom: 30
  },
  unregisterButton: {
    backgroundColor: "lightgray",
    alignSelf: "center",
    width: "60%",
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  textBtn: {
    fontSize: 18,
    color: colors.white,
  },
  pswIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 14,
    right: 12,
    color: "gray",
    fontSize: 21,
  },
  errorMessage: {
    alignSelf: "flex-start",
    color: "red",
    paddingTop: 3,
    fontSize: 12,
  },
});
