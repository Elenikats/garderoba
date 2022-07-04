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
import { globalStyles } from "../styles/globalStyles.js";
import Constants from "expo-constants";
import PermissionLocation from "./PermissionLocation.js";
import WeatherAPI from "./WeatherAPI.js";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import currentIP from "../utils/ip.js";
import { userContext } from "../../contexts/userContext.js";
import { LocationContext } from "../../contexts/LocationContext.js";
import { RefreshContext } from "../../contexts/refreshContext.js";

const { width } = Dimensions.get("window");
const { height } = width * 0.6;

const dayTimeButton = [
  { name: "sunrise", time: "09:00:00" },
  { name: "sun", time: "15:00:00" },
  { name: "sunset", time: "21:00:00" },
];

export default function HomeScreen() {
  const [images, setImages] = useState([]);
  const [sunIconStyle, setSuIconStyle] = useState(null);
  const { token } = useContext(userContext);
  const [toggleFav, setToggleFav] = useState(false);
  const {
    currentWeather,
    dropdownLabel,
    time,
    setTime,
    forecast,
    setForecast,
  } = useContext(LocationContext);
  const { refresh, setRefresh } = useContext(RefreshContext);

  //useEffect for images
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
      setRefresh(!refresh);
    } catch (error) {
      console.error("error in PUT", error.response.data);
    }
  }
  function handleForecast(e) {
    console.log(e);
    setForecast(e); // ="2022-07-04"

    // const urlForecastData = await axios({
    //   method: "get",
    //   headers: {
    //     Authorization: "",
    //   },
    // });
    // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=48.783333&lon=9.183333&appid=806513780cc07efedc5b9dabfbc00190&units=metric `;
    // const callingUrl = await fetch(url);
    // const response = await callingUrl.json();
    // console.log(response.list[0].main.temp);
    // try {
    //   const result = await axios({
    //     method: "get",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     url: `http://${ip}:9000/cloth/home?temperature=${currentWeather}`,
    //   });

    //   setImages(result.data.clothesAsPerWeather);
    // } catch (error) {
    //   console.log("error in homescreen:", error);
    // }
  }

  // if (!currentWeather) {
  //   return <Text>Loading</Text>
  // }

  function handleTimeIcon(item) {
    console.log("item here----", item);
    setTime(item.time);
    setSuIconStyle(item.name);
  }
  console.log("time---", time);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.weather}>
        <PermissionLocation />
        <WeatherAPI />
      </View>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={forecast}
          onValueChange={(e) => {
            handleForecast(e);
          }}
          style={styles.picker}
        >
          {dropdownLabel.map((item, index) => (
            <Picker.Item label={item} value={item} key={index} />
          ))}
        </Picker>
        <View style={styles.iconSunContainer}>
          {dayTimeButton.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTimeIcon(item)}
              style={sunIconStyle === item.name ? styles.activeSunIcon : null}
            >
              <IconFeather name={item.name} size={22} />
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
    backgroundColor: "blue",
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
