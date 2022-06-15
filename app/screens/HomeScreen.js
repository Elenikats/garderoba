import React from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import PermissionLocation from "./PermissionLocation.js";
import WeatherAPI from "./WeatherAPI.js";

const { width } = Dimensions.get("window");
const { height } = width * 0.6;
const imagesBox1 = [
  require("../assets/tshirt1.jpeg"),
  require("../assets/tshirt2.png"),
  require("../assets/tshirt3.jpeg"),
  require("../assets/tshirt4.jpeg"),
  require("../assets/tshirt5.jpeg"),
];

const imagesBox2 = [
  require("../assets/Hose1.png"),
  require("../assets/Hose2.jpeg"),
  require("../assets/Hose3.jpeg"),
  require("../assets/Hose4.jpeg"),
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.weather}>
        <PermissionLocation/>
        <WeatherAPI/>
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
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            style={(width, height)}
          >
            {imagesBox1.map((image, index) => (
              <Image key={index} source={image} />
            ))}
          </ScrollView>
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
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            style={(width, height)}
          >
            {imagesBox2.map((image, index) => (
              <Image key={index} source={image} />
            ))}
          </ScrollView>
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
    height: height,
    marginVertical: 5,
    width: width,
  },

  image: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: "cover",
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
