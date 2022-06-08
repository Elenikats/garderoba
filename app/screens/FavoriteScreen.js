import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";

export default function FavoriteScreen() {
  return (
    <SafeAreaView>
      <View style={styles.home}>
        <View style={styles.weather}>
          <Text>Weather</Text>
        </View>
        <Text>Garderoba</Text>
        <View style={[styles.box, { backgroundColor: "yellow" }]}></View>
        <View style={[styles.box, { backgroundColor: "green" }]}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  home: {
    position: "absolute",
  },

  box: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
});
