import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { LocationContext } from '../../contexts/LocationContext';

export default function WeatherAPI() {
    const [coordinates, setCoordinates] = useContext(LocationContext);
    const [currentWeather, setcurrentWeather] = useState(null);

    useEffect(() => {
        if (coordinates.loading) return

        const APIkey = "c84c5a060577c41f6cae4faa37b72569"
        const url =  `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${APIkey}&units=metric`
        console.log(url)

        fetch(url)
            .then(result => result.json())
            .then(data => setTemp(data.main.temp))
            .catch(err => console.log(err))

        
    }, [coordinates])


  return (
    <View>
      <Text>{temp}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})