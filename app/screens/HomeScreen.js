import React, { useEffect, useState, useContext } from "react";

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
import { ImageBoxesContext } from "../../contexts/ImageBoxesContext.js";
// import currentIP from "../utils/ip.js";

// const ip = await Network.getIpAddressAsync();
const { width } = Dimensions.get("window");
const { height } = width * 0.6;

export default function HomeScreen() {
  const { imagesBoxTop, setImagesBoxTop } = useContext(ImageBoxesContext);
  const { imagesBoxBottom, setImagesBoxBottom } = useContext(ImageBoxesContext);

  const [favorites, setFavorites] = useState([]);
  const [toggleFav, setToggleFav] = useState(false);

  //useEffect for images
  useEffect(() => {
    async function getImagesFromBackend() {
      // const ip = await currentIP();
      try {
        const result = await axios({
          method: "get",
          url: `http://10.44.57.28:9000/cloth/home`,
        });

        setImagesBoxTop(result.data.clothesTopBox);
        setImagesBoxBottom(result.data.clothesBottomBox);
        setFavorites(result.data.favorites);
      } catch (error) {
        console.log(error);
      }
    }

    getImagesFromBackend();
  }, [toggleFav]);

  async function handleFavoriteBtn(image) {
    const ip = await currentIP();

    try {
      await axios({
        url: `http://192.168.2.123:9000/cloth/${image._id}`,
        method: "PUT",
        data: { favorite: !image.favorite },
      });

      setToggleFav(!toggleFav);
    } catch (error) {
      console.error("error in PUT", error.response.data);
    }
  }

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
            {imagesBoxTop &&
              imagesBoxTop.map((image, index) => (
                <View style={styles.image} key={index}>
                  <Image
                    style={{ width: "80%", height: "80%" }}
                    source={{ uri: image.image }}
                  />

                  <TouchableOpacity
                    style={styles.boxfavorites}
                    onPress={() => {
                      handleFavoriteBtn(image);
                    }}
                  >
                    <Icon
                      style={styles.favoritesIcon}
                      name="heart"
                      color="red"
                      size={20}
                      solid={image.favorite ? true : false}
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
            {imagesBoxBottom &&
              imagesBoxBottom.map((image, index) => (
                <View style={styles.image} key={index}>
                  <Image
                    style={{ width: "80%", height: "80%" }}
                    source={{ uri: image.image }}
                  />

                  <TouchableOpacity
                    style={styles.boxFavorites}
                    onPress={() => {
                      handleFavoriteBtn(image);
                    }}
                  >
                    <Icon
                      style={styles.favoritesIcon}
                      name="heart"
                      color="red"
                      size={20}
                      solid={image.favorite ? true : false}
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
    justifyContent: "center",
  },

  boxFavorites: {
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
  favoritesIcon: {
    padding: 7,
  },
});
