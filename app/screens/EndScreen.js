import React, { useContext, useEffect, useState } from "react";
import { globalStyles, colors } from "../styles/globalStyles";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import { RefreshContext } from "../../contexts/RefreshContext.js";

export default function EndScreen({navigation}) {
  const [refreshEndScreen, setRefreshEndScreen] = useState(false)

  useEffect(() => {
    setRefreshEndScreen(!refreshEndScreen);
  }, [])
  return (
    <SafeAreaView style={[globalStyles.container, styles.bigCont]}>

         <LottieView source={require("../assets/logout.json")} autoPlay loop />

      <View style={styles.textCon}>
        <Text style={styles.text}>See you soon!</Text>
        <TouchableOpacity style={[globalStyles.activeButton, styles.loginBtn]}
          onPress={() => {
            navigation.navigate("LandingPage")
          }}> 
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bigCont: {
    backgroundColor: "white"
  },
  animation: {
    justifyContent: "center",
    alignItems: "center"
  },
  textCon: {
    bottom: 230, 
    justifyContent: "center",
    alignItems: "center"
  },
  loginBtn: {
    top: 450,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 200
  },
  loginText: {
    color: colors.white,
    fontSize: 17
  },
  text: {
    color: "white",
    backgroundColor: "orange",
    borderRadius: 5,
    fontSize: 30,
    padding: 20,
    textAlign: "center",
    shadowColor: "#27272A",
    shadowOpacity: 0.25,
    elevation: 10,

  }
})