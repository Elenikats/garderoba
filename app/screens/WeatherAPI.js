import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { LocationContext } from "../../contexts/LocationContext";
import axios from "axios";
import currentIP from "../utils/ip";
import { userContext } from "../../contexts/userContext";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../styles/globalStyles.js";

//import * as Network from 'expo-network'

export default function WeatherAPI() {
  // const {coordinates} = useContext(LocationContext);
  // const [currentWeather, setCurrentWeather] = useState(null);
  const { currentWeather, weatherIcon } = useContext(LocationContext);

  // useState to cover dates.

  const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;
  // console.log("iconUrl:", iconUrl);

  // useEffect(() => {
  //   // if (coordinates.loading) {
  //   //   return
  //   // }

  //   // console.log("coordinates.loading", coordinates.loading);

  //   const getWeather = async () => {
  //     // console.log("122464r9689");
  //     // console.log("ApiKey1:", weatherApiKey);
  //     console.log("curr Weather is 1----",currentWeather);
  //     // calling the weather API key from backend
  //     try {
  //      // const ip = await Network.getIpAddressAsync();
  //       const ip = await currentIP()
  //       // console.log("hi my ip is : ", ip);
  //       const result = await axios({
  //         method: "get",
  //         url: `http://${ip}:9000/weatherApiKey`,
  //       });
  //       setWeatherApiKey(result.data);

  //       //getting the current weather

  //       if (weatherApiKey) {
  //         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${weatherApiKey}&units=metric`;

  //         const callingUrl = await fetch(url);
  //         const response = await callingUrl.json();
  //         // console.log("weather response:", response);

  //         setCurrentWeather(response.main.temp.toFixed());
  //         console.log("curr Weather is 2----",currentWeather);
  //         setWeatherIcon(response.weather[0].icon);
  //       }
  //     } catch (error) {
  //       // console.log(error);
  //     }
  //   };

  //   getWeather();
  // }, [coordinates]); //

  // console.log("curr Weather is 3----",currentWeather);
  // function getWeatherFor5Days(){
  //    // forecast part -----
  //         // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${weatherApiKey}&units=metric`
  //         // console.log("url", url);
  //         // console.log("data:", result);
  // }

  // console.log("ApiKey2:", weatherApiKey);
  // console.log("currentWeather:", currentWeather);

  return (
    <LinearGradient
      colors={["#0CB0E0", "#89E3F5", "#4AC9E0"]}
      end={{ x: 0.1, y: 1.6 }}
      style={styles.weatherContainer}
    >
      <View style={globalStyles.logoContainer}>
        <Image source={require("../assets/Garderoba_small2.png")} />
      </View>

      <View style={styles.weatherWrapper}>
        {weatherIcon && (
          <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
        )}
        <Text style={styles.weatherText}>{currentWeather}°C</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    // paddingLeft: "70%",
    // paddingRight: "10%",
    justifyContent: "space-between",
    // backgroundColor: "lightblue",
  },
  weatherText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },

  weatherWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
  },
});
