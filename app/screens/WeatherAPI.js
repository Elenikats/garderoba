import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { LocationContext } from "../../contexts/LocationContext";
import axios from "axios";
import currentIP from "../utils/ip.js";
//import * as Network from 'expo-network'

export default function WeatherAPI() {
  const [coordinates] = useContext(LocationContext);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherApiKey, setWeatherApiKey] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  // useState to cover dates.

  const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;
  // console.log("iconUrl:", iconUrl);

  useEffect(() => {
    // if (coordinates.loading) {
    //   return
    // }

    // console.log("coordinates.loading", coordinates.loading);

    const getWeather = async () => {
      // console.log("122464r9689");
      // console.log("ApiKey1:", weatherApiKey);

      // calling the weather API key from backend
      try {
       // const ip = await Network.getIpAddressAsync();
        const ip = await currentIP()
        console.log("hi my ip is : ", ip);
        const result = await axios({
          method: "get",
          url: `http://${ip}:9000/weatherApiKey`,
        });
        setWeatherApiKey(result.data);
        

        //getting the current weather

        if (weatherApiKey) {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${weatherApiKey}&units=metric`;
          // const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.latitude}&lon=${coordinates.longitude}&cnt=14&appid=729f9a5767727471e69bd342825d0b4b
          // &units=metric`


         

          const callingUrl = await fetch(url);
          const response = await callingUrl.json();
          console.log("weather response:", response);

          setCurrentWeather(response.main.temp.toFixed());
          setWeatherIcon(response.weather[0].icon);
        }
      } catch (error) {
        // console.log(error);
      }
    };

    getWeather();
  }, [coordinates]); //

  function getWeatherFor5Days(){
     // forecast part -----
          // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${weatherApiKey}&units=metric`
          // console.log("url", url);
          // console.log("data:", result);
  }



  // console.log("ApiKey2:", weatherApiKey);
  // console.log("currentWeather:", currentWeather);

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.weatherText}>{currentWeather}°C</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: "center",
    flexDirection: "row-reverse",
    paddingLeft: 20,
    height: "100%",
    backgroundColor: "lightblue",
  },
  weatherText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});
