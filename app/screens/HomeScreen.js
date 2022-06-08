import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.weather}>
        <Text>Weather</Text>
      </View>
      <Text>Garderoba</Text>
      <View style={styles.home}>
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <View style={styles.boxFavorite}>
            <Icon
              style={styles.favoriteIcon}
              name="heart"
              color={"red"}
              size={20}
              solid
            />
          </View>
          <Image
            style={styles.image}
            source={require("../assets/tshirt2.png")}
          />
        </View>
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <View style={styles.boxFavorite}>
            <Icon
              style={styles.favoriteIcon}
              name="heart"
              color={"red"}
              size={20}
            />
          </View>
          <Image source={require("../assets/Hose1.png")} style={styles.image} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  home: {
    flex: 1,

    height: "100%",
  },
  weather: {
    height: "10%",
  },
  box: {
    flex: 1,
    borderRadius: 15,
    height: "50%",
    marginVertical: 5,
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  boxFavorite: {
    backgroundColor: "#F5F5F5",
    shadowColor: "#27272A",
    shadowOpacity: 0.25,
    elevation: 5,
    zIndex: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    position: "absolute",
    right: 15,
    top: 15,
  },
  favoriteIcon: {
    padding: 7,
  },
});
