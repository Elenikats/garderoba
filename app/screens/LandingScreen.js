import React, { useRef }  from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video } from 'expo-av';

export default function LandingScreen({ navigation }) {
  const video = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  setInterval(() => {
    const fadingFun = () => Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true
        }
      ).start();
  
      fadingFun()
  }, 5000);

  return (
    <SafeAreaView style={styles.bigCon}>

      <View style={styles.box}>  
        <Video
          ref={video}
          style={styles.video}
          source={require("../assets/Garderoba-top.mp4")}
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
            source={require("../assets/Garderoba-bottom.mp4")}
            resizeMode="cover"
            shouldPlay
            isLooping
          />
      </View>

      <Animated.View style={[styles.btnCon, {opacity: fadeAnim}]}>

        <TouchableOpacity style={styles.loginBtn}
          onPress={() => {
            navigation.navigate("Login")
          }}> 
          <Text style={styles.textBtn}>Login</Text>
        </TouchableOpacity>

      </Animated.View>
          
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bigCon: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
  alignSelf: "center",
  width: 350,
  height: 350,
  backgroundColor: "white",
  marginBottom: 20,
  borderWidth: 3,
  borderColor: "black",
  borderRadius: 20
  },
  video: {
  alignSelf: "center",
  width: "100%",
  height: "100%",
  borderRadius: 16
  },
  btnCon: {
    justifyContent: "center",
    alignItems: "center"
  },
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 15,
    paddingHorizontally: 20,
    width: 120,
    position: "absolute",
    backgroundColor:"#FE5F10",
    bottom: -15,
    borderRadius: 250,
    borderWidth: 3,
    shadowColor: "#4048BF",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 30.00,   
    elevation: 50,
  },
  textBtn: {
    color: "white",
    fontSize: 25
  },
})