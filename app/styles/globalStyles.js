import { StyleSheet } from "react-native";

const colors = {
  dark: "#27272A",
  light: "#E4E4E7",
  gray: "#9898A2",
  white: "#F8FAFC",
  black: "#000000",
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
    // borderRadius: 30,
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
    borderRadius: 40,
    padding: 5,
    margin: 10,
    textAlign: "center",
  },

  activeButton: {
    backgroundColor: colors.dark,
    color: colors.white,
    borderRadius: 40,
    padding: 5,
    margin: 10,
    textAlign: "center",
  },
});

export { colors, globalStyles };
