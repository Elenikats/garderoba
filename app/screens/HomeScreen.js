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
import axios from "axios";

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
  const [imagesBoxTop, setImagesBoxTop] = useState(null);
  const [imagesBoxBottom, setImagesBoxBottom] = useState(null);

  const [favorite, setFavorite] = useState([]);
  const [toggleFav, setToggleFav] = useState({ favorite: true });

  function handleFavoriteBtn(image) {
    const currentImage = favorite.find((i) => i == image);
    console.log("CURRENTIMAGE:", currentImage);
    if (currentImage) {
      const currentImages = favorite.filter((number) => number !== image);
      console.log("CURRENTIMAGES:", currentImages);
      setFavorite(currentImages);

      setToggleFav({ favorite: true });

      console.log("check toggle1:", toggleFav);
    } else {
      setFavorite([...favorite, image]);
      setToggleFav({ favorite: false });
      console.log("check toggle2:", toggleFav);
    }

    favorite.includes(image)
      ? setToggleFav({ favorite: true })
      : setToggleFav({ favorite: false });
    changeFav();
  }

  const changeFav = async (e) => {
    console.log("***********changeFav***************");
    console.log("***favorite:", favorite);
    // console.log("***CURRENTIMAGES:", currentImages);
    console.log("check toggle3:", toggleFav);

    try {
      await axios({
        url: "http://192.168.2.123:9000/cloth/62a9da46cab28870292628d3",
        method: "PUT",
        data: toggleFav,
      });
    } catch (error) {
      console.error("error in PUT", error.response.data);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.weather}>
        <PermissionLocation />
        <WeatherAPI />
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
