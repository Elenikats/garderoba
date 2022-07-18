import { View } from 'react-native'
import { globalStyles } from "../styles/globalStyles";
import React, { useContext } from 'react'
import { RefreshContext } from '../../contexts/RefreshContext';
import LottieView from "lottie-react-native";

export default function AppLoader() {
    const {isLoading, setIsLoading} = useContext(RefreshContext);
    return (
        <View style={globalStyles.container}>
            <LottieView source={require("../assets/clothes-loading.json")} autoPlay loop/>
        </View>
    )
}

