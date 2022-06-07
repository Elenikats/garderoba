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
    <SafeAreaView>
      <ScrollView style={styles.home}>
        <View style={styles.weather}>
          <Text>Weather</Text>
        </View>
        {/* <Text>Garderoba</Text> */}
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <Icon
            style={styles.favoriteIcon}
            name="heart"
            color={"red"}
            size={15}
          />
          <Image
            style={styles.image}
            source={require("../assets/tshirt2.png")}
          />
        </View>
        <View style={[styles.box, { backgroundColor: "white" }]}>
          <Icon
            style={styles.favoriteIcon}
            name="heart"
            color={"red"}
            size={15}
          />
          <Image source={require("../assets/Hose1.png")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //   home: {
  //     flex: 1,
  //     flexDirection: "row",
  //   },
  weather: {
    height: "10%",
  },
  box: {
    flex: 0,
    borderRadius: 15,
    height: "50%",
    marginBottom: 5,
    alignItems: "center",
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  favoriteIcon: {
    zIndex: 3,
    alignSelf: "flex-end",
    marginTop: 15,
    marginRight: 15,
  },
});
