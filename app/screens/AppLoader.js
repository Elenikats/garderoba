import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { globalStyles, colors } from "../styles/globalStyles";
import React, { useContext } from 'react'
import { RefreshContext } from '../../contexts/RefreshContext';
import LottieView from "lottie-react-native";

export default function AppLoader() {
    const {isLoading, setIsLoading} = useContext(RefreshContext);
    return (
        <View style={globalStyles.container}>
            {/* <ActivityIndicator size="large"/> */}
            <LottieView source={require("../assets/clothes-loading.json")} autoPlay loop/>
        </View>
    )
}

const styles = StyleSheet.create({})