import React, { useContext } from "react";
import { useEffect, useState } from "react";
import currentIP from "../app/utils/ip.js";
import axios from "axios";
import { userContext } from "./userContext.js";

export const LocationContext = React.createContext();

export default function LocationProvider(props) {
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
    loading: true,
  });
  const { token } = useContext(userContext);
  const [weatherApiKey, setWeatherApiKey] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [weatherLocation, setWeatherLocation] = useState(null);
  const [dateDropdownLabel, setDateDropdownLabel] = useState([]);
  const [forecastDate, setForecastDate] = useState(null);
  const [forecastTime, setForecastTime] = useState("");
  const [sunButtonValue, setSunButtonValue] = useState("");

  const value = {
    coordinates,
    setCoordinates,
    currentWeather,
    weatherIcon,
    weatherLocation,
    setForecastTime,
    forecastDate,
    setForecastDate,
    dateDropdownLabel,
    sunButtonValue,
    setSunButtonValue,
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    const getWeather = async () => {
      try {
        const ip = await currentIP();

        const result = await axios({
          method: "get",
          // headers:{
          //   Authorization: `Bearer ${token}`
          // }, -- might need it later?
          url: `http://${ip}:9000/weatherApiKey`,
        });

        setWeatherApiKey(result.data);
        //getting the current weather
        if (weatherApiKey) {
          const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${weatherApiKey}&units=metric`;
          const callingUrl2 = await fetch(url2);
          const response2 = await callingUrl2.json();
          setWeatherLocation(response2.city.name);
          const threeHourWeatherForecast = response2.list;
          const weatherDetails = await threeHourWeatherForecast.map((item) => {
            const time = item.dt_txt.split(" ")[1];
            const timeHour = parseInt(time[0] + time[1]);

            return {
              temperature: item.main.temp,
              date: item.dt_txt.split(" ")[0],
              time: item.dt_txt.split(" ")[1],
              icon:
                timeHour < 9 || timeHour > 20
                  ? item.weather[0].icon.replace("d", "n")
                  : item.weather[0].icon.replace("n", "d"),
              dayTimeButton:
                timeHour >= 6 && timeHour <= 9
                  ? "sunrise"
                  : timeHour >= 12 && timeHour <= 18
                  ? "sun"
                  : "sunset",
            };
          });

          const dateDetails = weatherDetails.map((item) => item.date);
          const uniqueDates = [...new Set(dateDetails)];
          setDateDropdownLabel(uniqueDates);

          if (!forecastTime) {
            setForecastTime(weatherDetails[0].time);
            setSunButtonValue(weatherDetails[0].dayTimeButton);
          }

          if (
            forecastDate == weatherDetails[0].date &&
            forecastTime == weatherDetails[0].time
          ) {
            //default weather:
            setCurrentWeather(weatherDetails[0].temperature.toFixed());
            setWeatherIcon(weatherDetails[0].icon);
          } else {
            //selected weather:
            const findCurrentWeather = weatherDetails.find(
              (item) => item.date === forecastDate && item.time === forecastTime
            );
            setCurrentWeather(findCurrentWeather.temperature.toFixed());
            setWeatherIcon(findCurrentWeather.icon);
          }
        }
      } catch (error) {
        console.log("error in location context weather", error);
      }
    };

    getWeather();
  }, [coordinates, weatherApiKey, token, forecastDate, forecastTime]);

  return (
    <LocationContext.Provider value={value}>
      {props.children}
    </LocationContext.Provider>
  );
}
