import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

function HomeScreen() {
  console.log("home jetzt");
  return (
    <SafeAreaView style={{ backgroundColor: "green" }}>
      <Text>Garderoba</Text>
      <Icon name="rocket" size={30} color="#900" />
      <View
        style={{
          width: "95%",
          height: "40%",
          padding: 20,
          backgroundColor: "blue",
        }}
      >
        hello
      </View>

      <View
        style={{
          width: "95%",
          height: "40%",
          padding: 20,
          backgroundColor: "red",
        }}
      ></View>
    </SafeAreaView>
  );
}

function FavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Garderoba</Text>
      <Icon name="rocket" size={30} color="#900" />
      <View
        style={{
          width: "95%",
          height: "40%",
          padding: 20,
          backgroundColor: "blue",
        }}
      ></View>

      <View
        style={{
          width: "95%",
          height: "40%",
          padding: 20,
          backgroundColor: "red",
        }}
      ></View>
    </SafeAreaView>
  );
}

export default function MainPageScreen() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.home}> */}
      <View style={styles.weather}>
        <Text>Weather</Text>
      </View>
      <Text>Garderoba</Text>
      <View style={[styles.box, { backgroundColor: "blue" }]}></View>
      <View style={[styles.box, { backgroundColor: "red" }]}></View>
      {/* </View> */}

      <View style={styles.NavContainer}>
        <View style={styles.NavBar}>
          <Pressable style={styles.IconBehave}>
            <Icon name="tshirt" size={25} color="#C1C1C1" />
            <Text>Home</Text>
          </Pressable>

          <Pressable style={styles.IconBehave}>
            <Icon name="heart" size={25} color="#C1C1C1" />
            <Text>Favorite</Text>
          </Pressable>
          <View style={styles.circle}>
            <Pressable style={styles.IconBehave}>
              <Icon name="camera" size={35} color="#FE5F10" />
            </Pressable>
          </View>

          <Pressable style={styles.IconBehave}>
            <Icon name="list" size={25} color="#C1C1C1" />
            <Text>Closet</Text>
          </Pressable>

          <Pressable style={styles.IconBehave}>
            <Icon name="user" size={25} color="#C1C1C1" />
            <Text>Profile</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#27272A",
    shadowOpacity: 0.25,
    elevation: 5,
  },

  home: {
    position: "absolute",
  },

  box: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },

  NavContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    borderTopWidth: 0.5,
    borderTopColor: "#F5F5F5", ///change to globalstyles
  },

  NavBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },

  IconBehave: {
    flex: -1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },

  circle: {
    zIndex: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
    backgroundColor: "#F5F5F5",

    top: -13,
  },
});
