import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { globalStyles, colors } from "../styles/globalStyles.js";
import axios from "axios";

export default function ClosetScreen() {
  const [closet, setCloset] = useState(null);
  const [filterOptions, setFilterOptions] = useState(["casual", "summer"]);

  useEffect(() => {
    async function getImagesFromBackend() {
      // const ip = await currentIP();
      try {
        const result = await axios({
          method: "get",
          url: `http://192.168.2.123:9000/cloth/closet`,
        });
        console.log("result---", result.data);
        setCloset(result.data);
      } catch (error) {
        console.log(error);
      }

      console.log("closet here", closet);
    }

    getImagesFromBackend();
  }, []);

  function handleFilterBtn() {}

  function handleMenuBtn() {}
  return (
    <SafeAreaView>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={handleFilterBtn}>
          <Icon name="filter" size={30} />
        </TouchableOpacity>
        {filterOptions &&
          filterOptions.map((option) => (
            <Text style={styles.filterOption}>{option}</Text>
          ))}
      </View>
      <ScrollView>
        <View style={styles.clothContainer}>
          {closet &&
            closet.map((image, index) => (
              <View style={styles.clothItem} key={index}>
                <Image
                  style={{ width: "40%", height: "40%" }}
                  source={{ uri: image.image }}
                />

                {/* <Text>season: {season}</Text>
              <Text>style: {style}</Text> */}

                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => {
                    handleMenuBtn();
                  }}
                >
                  <Icon style={styles.menuIcon} name="ellipsis-v" size={10} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    top: 60,
    left: 30,
    flexDirection: "row",
  },

  clothContainer: {
    flex: 1,
  },

  clothItem: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },

  filterOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#FE5F10",
    color: "white",
    textAlign: "center",
  },
});
