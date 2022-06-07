import react from "react";
import { StyleSheet, View, Text, Image, PermissionsAndroid, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from "react";
import CameraPreview from "./CameraPreviewScreen";


export default function CreateItemScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const camElement = useRef(null);
  const [ startCamera, setStartCamera ] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [ savePhoto,setSavePhoto ] = useState(null)
  const [ retakePicture, setRetakePicture ] = useState(null)


  const takeAPic = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');

    if(status === "granted"){
      setStartCamera(true)
      const photo =  await camElement.current.takePictureAsync();
      setPreviewVisible(true)
      setCapturedImage(photo)
    } else{
      Alert.alert("access denied")
    }
  }

  const __retakePicture=()=>{
    setCapturedImage(null)
    setPreviewVisible(false)
   
  }

  const __savePhoto=()=>{
    console.log("hi");
    
  }

  return (
    <View style={styles.container}>
      
      {previewVisible && capturedImage ? 
        (<CameraPreview photo={capturedImage} 
                        savePhoto={__savePhoto} 
                        retakePhoto={__retakePicture} />)  
        : 
        (<Camera style={styles.camera} 
                type={type} 
                ref={camElement}
        />)
      }

      <View style={styles.navContainer}>
            <View style={styles.sideMenus}>         
              <Icon name="images" size={20} color="orange" />
              <Text style={styles.text}>Gallery</Text>
            </View>
    
            <View style={styles.cam} >
              <Icon onPress={()=>{takeAPic()}} name="circle" size={30} color="white" />
            </View>
            
            <View style={styles.sideMenus}>
              <Icon name="graduation-cap" size={20} color="orange" />
              <Text style={styles.text}>Tips</Text>
            </View>
          </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,   
  },

  camera: {
    flex: 1,
  },

  navContainer: {
    borderTopWidth: 1,
    borderTopColor: "grey",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
  },
  sideMenus:{
    justifyContent: "space-around",
    alignItems: "center",
  },
  cam: {
    height: 50,
    width: 50,
    flex: -1,
    justifyContent: "center",
    alignItems: "center",
    borderColor:"white",
    backgroundColor: "orange",
    borderWidth: 1,
    borderRadius: 50,   
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
    fontSize: 14,
    color: 'grey',
  },
});