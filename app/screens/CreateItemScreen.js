import react, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";
import { globalStyles, colors } from "../styles/globalStyles.js";
import ColorPalette from "react-native-color-palette";
import axios from 'axios'
import * as FileSystem from 'expo-file-system';

export default function CreateItemScreen({ route, navigation }) {
  const [type, setType] = useState("");
  const [season, setSeason] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  // const [imageFile, setImageFile] = useState(null)

  // console.log("color:", color);
  // console.log("type:", type);
  // console.log("style:", style);
  // console.log("season:", season);
  // console.log("route is");
  // console.log(route);
  // console.log("navigation is");
  // console.log(navigation);

  const { image } = route.params;
  // console.log("1234567", image);
  // console.log(typeof image);

  // *****************************************FileSystem*************************
  const readImage = async() =>{
    console.log("image inside readImage is---", image);
    const imageAsString = await FileSystem.readAsStringAsync(image, {encoding: FileSystem.EncodingType.Base64})
    const base64Image = "data:image/png;base64," + imageAsString 
   
    return base64Image
  }

  


  const handleItemSave = async (e) => {
    console.log("***********wowwwwooowwwooooooo***************");
    e.preventDefault();
    navigation.navigate("Main");
    const readImageData = await readImage()
    console.log(readImageData);
    const payload = {
      type,
      season,
      style,
      color,
      image: readImageData,
    };
    


    // *********************** AXIOS ******************************
      try {
         const response = await axios({
          url: "http://192.168.1.47:9000/upload",
          headers: {
            'Authorization': '',
            'Content-Type': 'application/json', 
          },
          data: payload,
          method: 'POST'
        });

        
      } catch (error) {
        console.error("error is .....", error.response.data)
      }
  
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Picker
            selectedValue={type}
            onValueChange={(currentType) => setType(currentType)}
          >
            <Picker.Item label="choose type" />
            <Picker.Item label="Top" value="top" />
            <Picker.Item label="bottom" value="bottom" />
            <Picker.Item label="one piece" value="onePiece" />
          </Picker>
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
          {/* <Text>Selected: {season}</Text> */}
          <Picker
            selectedValue={style}
            onValueChange={(currentStyle) => setStyle(currentStyle)}
          >
            <Picker.Item label="choose style" />
            <Picker.Item label="casual" value="casual" />
            <Picker.Item label="formal" value="formal" />
            <Picker.Item label="work" value="work" />
            <Picker.Item label="holiday" value="holiday" />
          </Picker>
          <ColorPalette
            selectedValue={color}
            onChange={(currentColor) => setColor(currentColor)}
            colors={[
              "#000",
              "#fff",
              "#1C86EE",
              "#EE3B3B",
              "#FF82AB",
              "#E1C699",
              "#C1FFC1",
              "#2E8B57",
              "#7A8B8B",
              "#FFB90F",
              "#8B4500",
            ]}
            title={"choose color:"}
            icon={
              <Text
                style={color == "#000" ? styles.textWhite : styles.textBlack}
              >
                ✔
              </Text>
            }
          />
        </View>
        <TouchableOpacity
          onPress={(e)=>handleItemSave(e)}
          // disabled={!type || !season || !style || !color}
          style={
            type && season && style && color
              ? globalStyles.inactiveButton
              : globalStyles.activeButton
          }
        >
          <Text style={styles.textBtn}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "15%",
    flex: 1,
    alignItems: "center",
  },

  textBtn: {
    color: colors.white,
    textAlign: "center",
  },

  textWhite: {
    color: "white",
  },
  textBlack: {
    color: "black",
  },
});
