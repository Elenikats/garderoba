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
    // width: 120,
    // backgroundColor: colors.gray,
    // borderRadius: 40,
    // padding: 5,
    // margin: 10,
    // textAlign: "center",
    alignSelf: "center",
    width: 100,
    // borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray,
    marginTop: 30,
    marginBottom: 30, 

  },

  activeButton: {
    backgroundColor: colors.dark,
    color: colors.white,
    // borderRadius: 40,
    // padding: 5,
    // margin: 10,
    // textAlign: "center",
    alignSelf: "center",
    width: 100,
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30, 
  },
});

export { colors, globalStyles };
