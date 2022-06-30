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
import { globalStyles } from "../styles/globalStyles.js";
import Constants from "expo-constants";
import PermissionLocation from "./PermissionLocation.js";
import WeatherAPI from "./WeatherAPI.js";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import currentIP from "../utils/ip.js";
import { userContext } from "../../contexts/userContext.js";
<<<<<<< HEAD
//const ip = await Network.getIpAddressAsync();
import LocationProvider, {
  LocationContext,
} from "../../contexts/LocationContext.js";
=======
import LocationProvider, { LocationContext } from "../../contexts/LocationContext.js";
//const ip = await Network.getIpAddressAsync();
>>>>>>> 5af3b57b08b68e77c30745c612615bc4fbe1af29

const { width } = Dimensions.get("window");
const { height } = width * 0.6;

<<<<<<< HEAD
export default function HomeScreen() {
  const { imagesBoxTop, setImagesBoxTop } = useContext(ImageBoxesContext);
  const { imagesBoxBottom, setImagesBoxBottom } = useContext(ImageBoxesContext);
  const { user, setUser, token, setToken } = useContext(userContext);
  const [forecast, setForecast] = useState("");
=======
>>>>>>> 5af3b57b08b68e77c30745c612615bc4fbe1af29

export default function HomeScreen() {
  const [ images, setImages ] = useState([]);
  const { user, setUser, token, setToken } = useContext(userContext);
  const [toggleFav, setToggleFav] = useState(false);
<<<<<<< HEAD
  const { currentWeather, setCurrentWeather } = useContext(LocationContext);
  // console.log(currentWeather) need to get the state of current weather and pass it on as a value in query params of get request
  // const [presentWeather, setPresentWeather] = useState(null)

  // const WeatherObj = {
  //   summer: above 24
  //   winter: below 12
  //   fall: 12-24 degrees
  // }

=======
  const { currentWeather, setCurrentWeather } = useContext(LocationContext)
  
>>>>>>> 5af3b57b08b68e77c30745c612615bc4fbe1af29
  //useEffect for images
  useEffect(() => {
    if (!token) {
      return;
    }
    async function getImagesFromBackend() {
      const ip = await currentIP();

      try {
          if(!currentWeather){
            return;
          }
          const result = await axios({
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },            
            url: `http://${ip}:9000/cloth/home?temperature=${currentWeather}`
          });
          
          setImages(result.data.clothesAsPerWeather)
        
      } catch (error) {
        console.log("error in homescreen:", error);
      }
    }

    getImagesFromBackend();
  }, [currentWeather, token, toggleFav]);

  }, [currentWeather, token, toggleFav])

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
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={forecast}
          onValueChange={(currentDay) => setForecast(currentDay)}
        >
          <Picker.Item label="today" />
          <Picker.Item label="In one day" value="one" />
          <Picker.Item label="In two days" value="two" />
          <Picker.Item label="In three days" value="three" />
          <Picker.Item label="In four days" value="four" />
          <Picker.Item label="In five days" value="five" />
        </Picker>
      </View>
      <View style={styles.home}>
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {
              images.filter((item)=>item.type ==="top")
                    .map((image, index) => (
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
              images.filter((item)=>item.type ==="bottom")
                    .map((image, index) => (
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
    paddingTop: Constants.statusBarHeight,
  },
  home: {
    flex: 1,
  },
  weather: {
    height: 80,
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 6,
    width: "40%",
    alignSelf: "flex-end",
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
