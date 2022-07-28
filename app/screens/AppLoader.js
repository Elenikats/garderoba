import { View } from 'react-native'
import { globalStyles } from "../styles/globalStyles";
import React from 'react'
import LottieView from "lottie-react-native";

export default function AppLoader() {
    return (
        <View style={globalStyles.container}>
            <LottieView source={require("../assets/clothes-loading.json")} autoPlay loop/>
        </View>
    )
}