import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function EndScreen({navigation, route}) {
  return (
    <View style={styles.cont}>
      <Text>See you soon!</Text>
      <Button
        onPress={() => {
          navigation.navigate("Login")
        }}
        title="Login"> Login
    </Button>
    </View>
  );
}

const styles = StyleSheet.create({
cont: {
  flex:1,
  justifyContent: 'center',
  alignItems: 'center'
}
})