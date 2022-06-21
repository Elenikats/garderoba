import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { LocationContext } from '../../contexts/LocationContext';
import axios from 'axios';
import * as Network from 'expo-network';

export default function WeatherAPI() {
  const [coordinates] = useContext(LocationContext);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherApiKey, setWeatherApiKey] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)

  const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`

  useEffect(() => {
    // if (coordinates.loading) {
    //   return
    // }


    const getWeather = async () => {
      // calling the weather API key from backend
      try {

        const ip = await Network.getIpAddressAsync();
        console.log("ip:", ip)
        const result = await axios({
          method: 'get',
          url: `http://${ip}:9000/weatherApiKey`
        })
        setWeatherApiKey(result.data)
        console.log("data", result)


        //getting the current weather

        if (weatherApiKey) {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${weatherApiKey}&units=metric`          
          const callingUrl = await fetch(url)
          const response = await callingUrl.json()
          setCurrentWeather(response.main.temp.toFixed())
          setWeatherIcon(response.weather[0].icon)
        }

        
      } catch (error) {
        console.log(error)
      }
    }  
    
    getWeather()
      

  }, [coordinates])

  return (
    <View style={styles.weatherContainer}>
   
      <Text style={styles.weatherText}>{currentWeather}°C</Text>
      <Image style={styles.weatherIcon} source ={{ uri: iconUrl }}/>

    </View>
  )
}

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: "center",
    flexDirection: "row-reverse",
    paddingLeft: 20, 
    height: "100%",
    backgroundColor: "lightblue"
  },
  weatherText: {
    fontWeight: "bold",
    fontSize: 20
  },
  weatherIcon: {
    width: 100,
    height: 100
  }
})



