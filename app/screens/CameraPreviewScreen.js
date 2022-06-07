import React from 'react'
import { View, Text, ImageBackground, PermissionsAndroid, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

function CameraPreview({ photo,savePhoto,retakePhoto }) {

    return(
        <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      > 

        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        />

        <View 
        style={{   
            backgroundColor: 'transparent',
            borderTopWidth: 1,
            borderTopColor: "grey",
            width: "100%",
            height: "20%",
            flex:-1,
            flexDirection: "row",
            justifyContent: "space-around",
            position:"absolute",
            bottom: 0,
          }}>

        <TouchableOpacity onPress={savePhoto}>
            <Icon name="check" size={50} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity onPress={retakePhoto}>
            <Icon name="close" size={50} color="orange" />
        </TouchableOpacity>
        </View>
      </View>
    )
  
}

export default CameraPreview