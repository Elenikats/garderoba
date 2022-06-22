import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { LocationContext } from '../../contexts/LocationContext';

export default function PermissionLocation() {
  const [coordinates, setCoordinates] = useContext(LocationContext);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    const intervalFun = (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          console.log("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
        const { latitude, longitude } = location.coords
        // console.log("location:", location)
        setCoordinates({
          ...coordinates,
          latitude,
          longitude, 
          loading: false
        });
      });

      intervalFun()

      // setInterval(() => {
      //   intervalFun()
      //   console.log("interval running")
      // }, 100000);
  }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (coordinates) {
  //   text = JSON.stringify(coordinates.latitude);
  // }

  return (
    <>
      {/* <Text>langitude: {coordinates.longitude}   latitude: {coordinates.latitude}</Text> */}
    </>
  );
}
