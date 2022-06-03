import { StyleSheet } from "react-native";

const colors = {
    dark: "#27272A",
    light: "#E4E4E7",
    gray: "#9898A2",
    white: "#F8FAFC",
    black: "#000000"
}

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        alignItems: 'center',
        justifyContent: 'center',
      },
    titleText: {
        fontSize: 20,
        fontFamily: "LatoBold",
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    text: {
        fontFamily: "LatoRegular",
        fontSize: 18,
    }
})

export { colors, globalStyles }