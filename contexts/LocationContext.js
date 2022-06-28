import React, {useContext} from 'react';
import { useEffect, useState } from "react";
import currentIP from "../app/utils/ip.js";
import axios from "axios";
import { userContext } from './userContext.js';


export const LocationContext = React.createContext();


export default function LocationProvider(props) {
    const [coordinates, setCoordinates] = useState({latitude: "", longitude: "", loading: true});
    const [ currentWeather, setCurrentWeather ] = useState(null)
    const [ weatherApiKey, setWeatherApiKey ] = useState(null);
    const {user, setUser, token, setToken} = useContext(userContext);
    const [ helper, setHelper ] = useState(false)
    const [ weatherIcon, setWeatherIcon ] = useState(null);
    // const [ iconUrl, setIconUrl ] = useState(null);
    // const [iconUrl, setIconUrl ] = useState(null)
    const value = {coordinates, setCoordinates, currentWeather, setCurrentWeather, weatherIcon, helper };

    


  useEffect(() => {
    
    if(!token){
      return;
    }
    const getWeather = async () => {
      // console.log("122464r9689");
      // console.log("ApiKey1:", weatherApiKey);
      // console.log("curr Weather is 1----",currentWeather);
      // calling the weather API key from backend
      try {
        // const ip = await Network.getIpAddressAsync();
        const ip = await currentIP()
       
        const result = await axios({
          method: "get",
          // headers:{
          //   Authorization: `Bearer ${token}`
          // }, -- might need it later?
          url: `http://${ip}:9000/weatherApiKey`,
        });
        console.log(99999999, result.data)

        setWeatherApiKey(result.data);
        //getting the current weather
        if (weatherApiKey) {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${weatherApiKey}&units=metric`;
          // const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.latitude}&lon=${coordinates.longitude}&cnt=14&appid=729f9a5767727471e69bd342825d0b4b
          // &units=metric` --another example url to get 14 days forecast

          const callingUrl = await fetch(url);
          const response = await callingUrl.json();
          setCurrentWeather(response.main.temp.toFixed());
          setWeatherIcon(response.weather[0].icon);
        }
      } catch (error) {
        console.log("location context weather", error);
      }
    };
    console.log("coords---", coordinates, weatherApiKey);
    getWeather();
  }, [coordinates, weatherApiKey, token ]); 


    return (
        <LocationContext.Provider value={value}>{props.children}</LocationContext.Provider>
    )
}
