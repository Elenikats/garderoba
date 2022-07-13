import { View } from 'react-native'
import { globalStyles, colors } from "../styles/globalStyles";
import React, { useContext } from 'react'
import { RefreshContext } from '../../contexts/refreshContext';
import LottieView from "lottie-react-native";

export default function AppLoader() {
    return (
        <View style={globalStyles.container}>
            <LottieView source={require("../assets/clothes-loading.json")} autoPlay loop/>
        </View>
    )
}
