import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { LocationContext } from '../../contexts/LocationContext';
import axios from 'axios';

export default function WeatherAPI() {
  const [coordinates] = useContext(LocationContext);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherApiKey, setWeatherApiKey] = useState("")

  useEffect(() => {
    if (coordinates.loading) return

    const getWeather = async () => {
      // calling the weather API key from backend
      try {
        const result = await axios({
          method: 'get',
          url: 'http://192.168.1.50:8000/weatherApiKey'
        })
        setWeatherApiKey(result.data)
        console.log("ApiKey:", weatherApiKey)


        //getting the current weather

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${weatherApiKey}&units=metric`
        console.log("url", url)
        console.log("data:", result)
        
        const callingUrl = await fetch(url)
        const response = await callingUrl.json()
        const currentWeather = setCurrentWeather(response.main.temp.toFixed())
        
      } catch (error) {
        console.log(error)
      }
    }  

    
    getWeather()

  }, [coordinates])

  console.log("currentWeather:",currentWeather)


  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.weatherText}>{currentWeather}°C</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: "center",
    flexDirection: "row-reverse",
    paddingLeft: 20, 
    height: "100%"
  }
})



