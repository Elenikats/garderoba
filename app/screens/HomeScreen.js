import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import IconFA from "react-native-vector-icons/FontAwesome5";
import Constants from "expo-constants";
import WeatherAPI from "./WeatherAPI.js";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import currentIP from "../libs/ip.js";
import { userContext } from "../../contexts/UserContext.js";
import { LocationContext } from "../../contexts/LocationContext.js";
import { RefreshContext } from "../../contexts/RefreshContext.js";
import AppLoader from "./AppLoader.js";

const { width } = Dimensions.get("window");
const { height } = width * 0.6;

const sunButtonValues = [
  { name: "sunrise", time: "09:00:00" },
  { name: "sun", time: "15:00:00" },
  { name: "sunset", time: "21:00:00" },
];

export default function HomeScreen() {
  const [images, setImages] = useState([]);
  const { token } = useContext(userContext);
  const [toggleFav, setToggleFav] = useState(false);
  const {
    currentWeather,
    dateDropdownLabel,
    setForecastTime,
    forecastDate,
    setForecastDate,
    sunButtonValue,
    setSunButtonValue,
  } = useContext(LocationContext);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [ homepageIsLoading, setHomepageIsLoading ] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }
    async function getImagesFromBackend() {
      const ip = await currentIP();

      try {
        if (!currentWeather) {
          return;
        }
        
        const result = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `http://${ip}:9000/cloth/home?temperature=${currentWeather}`,
        });

        setImages(result.data.clothesAsPerWeather);
        setHomepageIsLoading(false);
      } catch (error) {
        console.log("error in homescreen:", error);
      }
    }
    getImagesFromBackend();
  }, [currentWeather, token, toggleFav, refresh]);

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
      setHomepageIsLoading(false);

      setRefresh(!refresh);
    } catch (error) {
      console.error("error in PUT", error.response.data);
    }
  }

  function handleTimeIcon(item) {
    setForecastTime(item.time);
    setSunButtonValue(item.name);
  }

   if (homepageIsLoading) {
     return <AppLoader/>
   }

  return (
    <>
    <SafeAreaView style={styles.container}>
      <View style={styles.weather}>
        <WeatherAPI />
      </View>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={forecastDate}
          onValueChange={(e) => {
            setForecastDate(e);
          }}
          style={styles.picker}
        >
          {dateDropdownLabel.map((item, index) => (
            <Picker.Item label={item} value={item} key={index} />
          ))}
        </Picker>
        <View style={styles.iconSunContainer}>
          {sunButtonValues.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleTimeIcon(item)}>
              <IconFeather
                name={item.name}
                size={22}
                style={
                  sunButtonValue && sunButtonValue === item.name
                    ? styles.activeSunIcon
                    : null
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.home}>
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {images
              .filter((item) => item.type === "top")
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
                    <IconFA
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
            {images
              .filter((item) => item.type === "bottom")
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
                    <IconFA
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#F0F0F8",
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
    width: "40%",
    position: "absolute",
    top: Constants.statusBarHeight,
    pickerStyleType: "none",
  },

  iconSunContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  activeSunIcon: {
    color: "#FE5F10",
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
