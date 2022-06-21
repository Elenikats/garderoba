import React from 'react';
import { useEffect, useState } from "react";

export const LocationContext = React.createContext();


export default function LocationProvider(props) {
    const [coordinates, setCoordinates] = useState({latitude: "", longitude: "", loading: true});


    const value = [coordinates, setCoordinates];

    return (
        <LocationContext.Provider value={value}>{props.children}</LocationContext.Provider>
    )
}
