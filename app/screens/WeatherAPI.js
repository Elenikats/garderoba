import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { LocationContext } from "../../contexts/LocationContext";
import axios from "axios";
import currentIP from "../utils/ip";
import { userContext } from "../../contexts/userContext";
//import * as Network from 'expo-network'

export default function WeatherAPI() {
  const { currentWeather, weatherIcon } = useContext(LocationContext)
  const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.weatherText}>{currentWeather}°C</Text>
     {weatherIcon && <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />}
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
    position: "relative"
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
