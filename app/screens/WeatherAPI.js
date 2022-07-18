import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { LocationContext } from "../../contexts/LocationContext";
import { LinearGradient } from "expo-linear-gradient";

export default function WeatherAPI() {
  const { currentWeather, weatherIcon, weatherLocation } =
    useContext(LocationContext);
  const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;

  return (
    <LinearGradient
      colors={["#59B9FA", "#8CD2FA", "#F0F0F8"]}
      style={styles.weatherContainer}
    >
      <View style={styles.weatherWrapper}>
        {weatherIcon && (
          <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
        )}
        <Text style={styles.weatherText}>{currentWeather}°C</Text>
        <Text style={styles.location}>{weatherLocation}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  weatherText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  location: {
    position: "absolute",
    top: 60,
    right: 15,
  },
  weatherWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
  },
});
