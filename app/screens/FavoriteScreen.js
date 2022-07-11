import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../contexts/userContext";
import currentIP from "../libs/ip.js";
import axios from "axios";
import { RefreshContext } from "../../contexts/refreshContext";
import AppLoader from "./AppLoader";

export default function FavoriteScreen() {
  const { token } = useContext(userContext);
  const [fav, setFav] = useState([]);
  const {refresh, setRefresh, isLoading, setIsLoading } = useContext(RefreshContext)

  useEffect(() => {
    async function getImagesFromBackend() {
      const ip = await currentIP();
      try {
        const result = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `http://${ip}:9000/cloth/favorite`,
        });
        setFav(result.data);

      } catch (error) {
        console.log("error in fetching favorites",error);
      }
      
    }

    getImagesFromBackend();
  }, [refresh]);

  if (isLoading) {
    return <AppLoader/>
  }

  
  return (
    <SafeAreaView>
      <View style={styles.outerCont} />
      <ScrollView>
        <View style={styles.cont}>
        { fav.map((image, index) => (
              <View style={styles.clothItem} key={index}>
                <Image style={styles.image} source={{ uri: image.image }} />
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerCont: {
    height: 50
  },
  cont: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "95%",
    alignSelf: "center",
    paddingBottom: 80,
  },
  clothItem: {
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    marginHorizontal: 15,
    backgroundColor: "red",
    backgroundColor: "#fff",
    shadowColor: "#27272A",
    shadowOpacity: 0.25,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  image: {
    width: 100,
    height: 100,
    // borderWidth: 1,
    borderColor: "lightgray",
  },
});
