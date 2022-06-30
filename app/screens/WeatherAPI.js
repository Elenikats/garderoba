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
  const { currentWeather, weatherIcon } = useContext(LocationContext);
  const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;

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
