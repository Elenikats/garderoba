import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
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
  const [favorite, setFavorite] = useState([]);

  function handleFavoriteBtn(image) {
    const currentImage = favorite.find((i) => i == image);
    if (currentImage) {
      const currentImages = favorite.filter((number) => number !== image);
      setFavorite(currentImages);
    } else {
      setFavorite([...favorite, image]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.weather}>
        {/* <PermissionLocation/>
        <WeatherAPI/> */}
      </View>
      <Text>Garderoba</Text>
      <View style={styles.home}>
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {imagesBox1.map((image, index) => (
              <View style={styles.image} key={index}>
                <Image source={image} />
                <TouchableOpacity
                  style={styles.boxFavorite}
                  onPress={() => {
                    handleFavoriteBtn(image);
                  }}
                >
                  <Icon
                    style={styles.favoriteIcon}
                    name="heart"
                    color="red"
                    size={20}
                    solid={favorite.includes(image) ? true : false}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {imagesBox2.map((image, index) => (
              <View style={styles.image} key={index}>
                <Image source={image} />
                <TouchableOpacity
                  style={styles.boxFavorite}
                  onPress={() => {
                    handleFavoriteBtn(image);
                  }}
                >
                  <Icon
                    style={styles.favoriteIcon}
                    name="heart"
                    color="red"
                    size={20}
                    solid={favorite.includes(image) ? true : false}
                  />
                </TouchableOpacity>
              </View>
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
    width: width,
    height: height,
    alignItems: "center",
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
