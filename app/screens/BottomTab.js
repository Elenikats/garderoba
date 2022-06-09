import { StyleSheet, View, Text, Button, Modal,Pressable } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen.js";
import FavoriteScreen from "./FavoriteScreen.js";
import CreateItemScreen from "./CreateItemScreen.js";
import ClosetScreen from "./ClosetScreen.js";
import UserScreen from "./UserScreen.js";
import * as ImagePicker from 'expo-image-picker';


const Tab = createBottomTabNavigator();

export default function BottomTab() {

  const [modalVisible, setModalVisible] = useState(false);

  async function launchCamera(){
    const options = { quality: 0.5 };
    const data = await ImagePicker.launchCameraAsync(options);
    console.log(data);
  }  

  async function launchGallery(){
    const options = { allowsMultipleSelection: true }
    const data = await ImagePicker.launchImageLibraryAsync(options)
    console.log(data);
  }

  

  return (

    <>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {},
        tabBarActiveTintColor: "#27272A",
        tabBarInactiveTintColor: "#C1C1C1",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="tshirt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} solid />
          ),
        }}
      />
      <Tab.Screen
        name="Cam"
        component={CreateItemScreen}
        options={{
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            
            <View style={styles.circle}>
              <Icon name="camera" color="#FE5F10" size={40} 
              onPress={()=>{setModalVisible(true)}}
               
              />
           
            </View>

          ),
          
        }}
      />
      <Tab.Screen
        name="Closet"
        component={ClosetScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} solid />
          ),
        }}
      />
    </Tab.Navigator>
    
    <> 
    {modalVisible && <Modal  
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
      <View style={styles.centeredView}>
          
          <View style={styles.modalView}>

            <Pressable
              style={styles.closeModal}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyleX}>X</Text>
           
            </Pressable>  

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                launchCamera();
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Camera</Text>
           
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                launchGallery();
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Gallery</Text>
           
            </Pressable>

            
          </View>
        </View>
      </Modal>}
    </>
    
    </>
    
  );
}

const styles = StyleSheet.create({
  circle: {
    zIndex: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
    margin: -10,
    backgroundColor: "#F5F5F5",
    shadowColor: "#27272A",
    shadowOpacity: 0.25,
    elevation: 5,
    top: -10,
  },

  closeModal:{
    borderWidth: 0.5,
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 5,
    position: "absolute",
    right: -5,
    top: -7,

  },
  textStyleX:{
    color: "black",
    fontWeight: "bold"
  },
  centeredView: {
    flex: 1,

    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 70,
  },
  modalView: {
    width: "50%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width:"100%",
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
  },
  buttonOpen: {
    backgroundColor: "black",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
  

  
});
