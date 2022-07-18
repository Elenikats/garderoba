import { StyleSheet } from "react-native";

const colors = {
  dark: "#27272A",
  light: "#E4E4E7",
  gray: "#9898A2",
  white: "#F8FAFC",
  black: "#000000",
  red: "#D10000"

};
const globalStyles = StyleSheet.create({
  logoContainer: {
    zIndex: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#Fff",
    shadowColor: "#black",
    shadowOpacity: 0.5,
    elevation: 20,
    width: 80,
    height: 80,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  },
  inactiveButton: {
    backgroundColor: colors.gray,
    color: colors.white,
    textAlign: "center",
    alignSelf: "center",
    width: 100,
    borderRadius: 50,
    padding: 10,
    margin: 15,
  },
  activeButton: {
    backgroundColor: colors.dark,
    color: colors.white,
    textAlign: "center",
    alignSelf: "center",
    width: 100,
    borderRadius: 50,
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 15,
  },
});

export { colors, globalStyles };
