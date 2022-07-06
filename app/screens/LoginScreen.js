import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "@react-navigation/native";
import currentIP from "../utils/ip.js";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { globalStyles, colors } from "../styles/globalStyles";
import { userContext } from "../../contexts/userContext";
// import * as Google from "expo-google-app-auth"
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation, expoClientIdValue }) {
  const {
    user,
    setUser,
    token,
    setToken,
    setUserEmail,
    currentUserId,
    setCurrentUserId,
    userObj,
    setUserObj,
  } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState();



  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: expoClientIdValue
  });

  useEffect(() => {
    console.log("response google:", response)
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

  // if (!expoClientIdValue) {
  //   return <Text>loadiiiiiiiiiiing</Text>;
  // }

  ////////////////////

  const handleOpenEye = () => {
    setHidePassword(!hidePassword);
  };

  const handleLogin = async () => {
    // login emails to use:
    // { email: "baba123@gmail.com", password: "kanmio123" }
    // { email: "angela.h@web.de", password: "123456" }
    // {email: "cabbage@gmail.com",password: "cabbage"}
    // {email: "testuser1@example.com",password: "random"}
    // {email: "testuser4@eg.com",password: "random123"}

    const ip = await currentIP();

    const url = `http://${ip}:9000/users/login`;
    try {
      const res = await axios.post(url, {
        email: "cabbage@gmail.com",
        password: "cabbage",
        // email: "testuser1@example.com",
        // password:"random",
        // email: "angela.h@web.de",
        // password: "123456",
        // email: "testuser1@example.com",password: "random"
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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.cont}>
  
          <Image source={require("../assets/Garderoba_medium.png")} style={styles.logo} />

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
          {/* <Text style={styles.label}>Email</Text> */}
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
          {/* <Text style={styles.label}>Password</Text> */}
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
            {/* <Link to={{ screen: "" }} style={styles.forgotPass}>
              Forgot password?
            </Link> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },
  logo: {
    marginBottom: "20%",
    marginTop: 50,
    borderRadius: 50,
    width: 100,
    height: 100,
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
    padding: 20,
    alignSelf: "center",
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
    marginBottom: 30,
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
    fontSize: 18,
  },
  errorMessage: {
    alignSelf: "flex-start",
    color: "red",
    paddingTop: 3,
    fontSize: 12,
  },
});
