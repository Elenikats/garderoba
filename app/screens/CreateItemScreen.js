import react, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";

export default function CreateItemScreen({ route }) {
  const [season, setSeason] = useState("");
  const { image } = route.params;
  console.log("1234567", image);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text> Demo Form </Text>
        <View>
          <Text>Image Uploaded: </Text>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <TextInput placeholder="Email" />
          <TextInput secureTextEntry={true} placeholder="Password" />
          <Picker
            selectedValue={season}
            onValueChange={(currentSeason) => setSeason(currentSeason)}
          >
            <Picker.Item label="choose season" />

            <Picker.Item label="spring" value="spring" />
            <Picker.Item label="summer" value="summer" />
            <Picker.Item label="fall" value="fall" />
            <Picker.Item label="winter" value="winter" />
          </Picker>
          <Text>Selected: {season}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
});
