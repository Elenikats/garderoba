import react from "react";
import { StyleSheet, View, Text, Image, PermissionsAndroid, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from "react";

export default function CreateItemScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);


  const openCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
  }

  if (hasPermission === false) {
    return (
      
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("./assets/tee.jpg")} 
        />
  
        <View style={styles.navContainer}>
          <View style={styles.sideMenus}>         
            <Icon name="images" size={20} color="orange" />
            <Text style={styles.text}>Gallery</Text>
          </View>
  
          <View style={styles.cam}>
            <Icon onPress={()=>{openCamera()}} name="camera" size={30} color="orange" />
          </View>
          
          <View style={styles.sideMenus}>
            <Icon name="graduation-cap" size={20} color="orange" />
            <Text style={styles.text}>Tips</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container2}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text onPress={()=>setHasPermission(false)}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    // flex: -1,
    width: "100%",
    height: "70%",
  },
  navContainer: {
    borderTopWidth: 1,
    borderTopColor: "grey",
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  cam: {
    height: 60,
    width: 60,
    flex: -1,
    justifyContent: "center",
    alignItems: "center",
    borderColor:"white",
    backgroundColor: "#E4E4E7",
    borderWidth: 1,
    borderRadius: 50,   
  },
  container2: {
    flex: 1,
    
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});