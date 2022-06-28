import React, { useEffect, useState, useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import PermissionLocation from "./PermissionLocation.js";
import WeatherAPI from "./WeatherAPI.js";
import axios from "axios";

import currentIP from "../utils/ip.js";
import { userContext } from "../../contexts/userContext.js";
//const ip = await Network.getIpAddressAsync();
import LocationProvider, { LocationContext } from "../../contexts/LocationContext.js";

const { width } = Dimensions.get("window");
const { height } = width * 0.6;

export default function HomeScreen() {
  const [ images, setImages ] = useState([]);
  const {user, setUser, token, setToken} = useContext(userContext);
  const [toggleFav, setToggleFav] = useState(false);
  const { currentWeather, setCurrentWeather } = useContext(LocationContext)
  // console.log(currentWeather) need to get the state of current weather and pass it on as a value in query params of get request
  // const [presentWeather, setPresentWeather] = useState(null)
  
  // const WeatherObj = {
  //   summer: above 24
  //   winter: below 12
  //   fall: 12-24 degrees
  // }


  //useEffect for images
  useEffect(() => {
    if (!token) {
      return
    }
    async function getImagesFromBackend() {
      console.log("getting images take 1----");
      const ip = await currentIP();
      console.log("currentWeather is ----",currentWeather);
      try {
          if(!currentWeather){
            return;
          }
          console.log("token---", token);
          const result = await axios({
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },            
            url: `http://${ip}:9000/cloth/home?temperature=${currentWeather}`
          });
          
          // console.log("result from BE for weather----", result.data);

          // result.data.clothesAsPerWeather.forEach(element => {
          //   console.log(element.type);
          // });

          setImages(result.data.clothesAsPerWeather)
          // setImagesBoxTop(result.data.clothesTopBox);
          // setImagesBoxBottom(result.data.clothesBottomBox);
          // setFavorites(result.data.favorites);
     

        
      } catch (error) {
        console.log("error in homescreen:", error);
      }
    }

    getImagesFromBackend();
  

  }, [currentWeather, token, toggleFav])

// [toggleFav, currentWeather]
  async function handleFavoriteBtn(image) {
    const ip = await currentIP();

    try {
      await axios({
        url: `http://${ip}:9000/cloth/${image._id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },    
        data: { favorite: !image.favorite },
      });

      setToggleFav(!toggleFav);
    } catch (error) {
      console.error("error in PUT", error.response.data);
    }
  }

  // if (!currentWeather) {
  //   return <Text>Loading</Text>
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.weather}>
        <PermissionLocation />
        <WeatherAPI />
      </View>
      <Text>Garderoba</Text>
      <View style={styles.home}>
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              images.filter((item)=>item.type ==="top").map((image, index) => (
                <View style={styles.image} key={index}>
                  <Image
                    style={{ width: "80%", height: "80%" }}
                    source={{ uri: image.image }}
                  />

                  <TouchableOpacity
                    style={styles.boxFavorites}
                    onPress={() => {
                      handleFavoriteBtn(image);
                    }}
                  >
                    <Icon
                      style={styles.favoritesIcon}
                      name="heart"
                      color="red"
                      size={20}
                      solid={image.favorite ? true : false}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
        </View>
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            { 
              images.filter((item)=>item.type ==="bottom").map((image, index) => (
                <View style={styles.image} key={index}>
                  <Image
                    style={{ width: "80%", height: "80%" }}
                    source={{ uri: image.image }}
                  />

                  <TouchableOpacity
                    style={styles.boxFavorites}
                    onPress={() => {
                      handleFavoriteBtn(image);
                    }}
                  >
                    <Icon
                      style={styles.favoritesIcon}
                      name="heart"
                      color="red"
                      size={20}
                      solid={image.favorite ? true : false}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  home: {
    flex: 1,

    height: "100%",
  },
  weather: {
    height: "10%",
  },
  box: {
    flex: 1,
    borderRadius: 15,
    height: height,
    marginVertical: 5,
    width: width,
  },

  image: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },

  boxFavorites: {
    backgroundColor: "#F5F5F5",
    shadowColor: "#27272A",
    shadowOpacity: 0.25,
    elevation: 5,
    zIndex: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    position: "absolute",
    right: 15,
    top: 15,
  },
  favoritesIcon: {
    padding: 7,
  },
});
