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
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherApiKey, setWeatherApiKey] = useState(null);
  const { token } = useContext(userContext);
  const [helper, setHelper] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [weatherLocation, setWeatherLocation] = useState(null);
  const [dropdownLabel, setDropdownLabel] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [time, setTime] = useState("09:00:00");

  const value = {
    coordinates,
    setCoordinates,
    currentWeather,
    setCurrentWeather,
    weatherIcon,
    weatherLocation,
    helper,
    time,
    setTime,
    forecast,
    setForecast,
    dropdownLabel,
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
          // setForecastList(response2.list);
          // console.log("122233344", response2);
          // console.log("response list is----", response2.list);
          setWeatherLocation(response2.city.name);
          const threeHourWeatherForecast = response2.list;
          // console.log("3h----", threeHourWeatherForecast);
          const weatherDetails = await threeHourWeatherForecast.map((item) => {
            const time = item.dt_txt.split(" ")[1];
            const timeHour = parseInt(time[0] + time[1]);

            return {
              temperature: item.main.temp,
              date: item.dt_txt.split(" ")[0],
              time: item.dt_txt.split(" ")[1],
              // helper variable.
              icon:
                timeHour < 9 || timeHour > 20
                  ? item.weather[0].icon.replace("d", "n")
                  : item.weather[0].icon.replace("n", "d"),
            };
          });
          // console.log("weatherdeets", weatherDetails);

          console.log("just icons,----", weatherDetails[7].icon);
          const dateDetails = weatherDetails.map((item) => item.date);
          const uniqueDates = [...new Set(dateDetails)];
          setDropdownLabel(uniqueDates);
          // console.log(response2);
          if (forecast == weatherDetails[0].date && time == "09:00:00") {
            //default weather:
            setCurrentWeather(weatherDetails[0].temperature.toFixed());
            setWeatherIcon(weatherDetails[0].icon);
          } else {
            //selected weather:
            const findCurrentWeather = weatherDetails.filter(
              (item) => item.date === forecast && item.time === time
            );

            setCurrentWeather(findCurrentWeather[0].temperature.toFixed());
            setWeatherIcon(findCurrentWeather[0].icon);
          }
        }
      } catch (error) {
        console.log("error in location context weather", error);
      }
    };

    getWeather();
  }, [coordinates, weatherApiKey, token, forecast, time]);

  return (
    <LocationContext.Provider value={value}>
      {props.children}
    </LocationContext.Provider>
  );
}
