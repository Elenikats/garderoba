import React, { useState, useRef }  from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles, colors } from "../styles/globalStyles";
import Constants from "expo-constants";
import { Video } from 'expo-av';

const { width } = Dimensions.get("window");
const { height } = width * 0.6;

export default function LandingScreen({ navigation }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <SafeAreaView style={styles.bigCon}>

          <View style={styles.box}>  
            <Video
              ref={video}
              style={styles.video}
              source={require("../assets/Garderoba-top-last.mp4")}
              useNativeControls={false}
              resizeMode="cover"
              shouldPlay
              isLooping
            />
          </View>

          <View style={styles.box}>
            <Video
                ref={video}
                style={styles.video}
                // source={{uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1'"}}
                source={require("../assets/Garderoba-bottom-last.mp4")}
                resizeMode="cover"
                shouldPlay
                isLooping
              />
          </View>

          <View styles={styles.btnCon}>
            <TouchableOpacity style={[globalStyles.activeButton, styles.loginBtn]}
              onPress={() => {
                navigation.navigate("Login")
              }}> 
              <Text style={styles.textBtn}>Login</Text>
            </TouchableOpacity>
          </View>
          
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bigCon: {
    backgroundColor: "orange",
    flex: 1
  },
  box: {
  alignSelf: "center",
  width: 350,
  height: 350,
  backgroundColor: "orange",
  margin: 20,
  borderWidth: 5,
  borderColor: "orange",
  borderRadius: 20
  },
  video: {
  alignSelf: "center",
  width: "100%",
  height: "100%",
  borderRadius: 15
  },
  btnCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    paddingVertical: 32,
    width: 100,
    position: "absolute",
    backgroundColor:"white",
    bottom: 330,
    borderWidth: 4,
    borderColor: "darkorange",
    shadowColor: "#27272A",
    shadowOpacity: 0.25,
    elevation: 500,
  },
  textBtn: {
    color: "orange",
    fontSize: 20,
    fontWeight: "bold"
  },
})