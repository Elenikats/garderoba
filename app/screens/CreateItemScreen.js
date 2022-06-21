import react, { useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import { Picker } from "@react-native-picker/picker";
import { globalStyles, colors } from "../styles/globalStyles.js";
import ColorPalette from "react-native-color-palette";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { ImageBoxesContext } from "../../contexts/ImageBoxesContext.js";
import * as Network from 'expo-network';

export default function CreateItemScreen({ route, navigation }) {
  const { imagesBoxTop, setImagesBoxTop } = useContext(ImageBoxesContext);
  const { imagesBoxBottom, setImagesBoxBottom } = useContext(ImageBoxesContext);

  const [type, setType] = useState("");
  const [season, setSeason] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [weather, setWeather] = useState("");
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

  const readImage = async () => {
    console.log("image inside readImage is---", image);
    const imageAsString = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const base64Image = "data:image/png;base64," + imageAsString;

    return base64Image;
  };



  const handleItemSave = async (e) => {
    console.log("***********wowwwwooowwwooooooo***************");
    e.preventDefault();
    navigation.navigate("Main");

    console.log(imagesBoxTop);

    const readImageData = await readImage();

    const payload = {
      type,
      season,
      style,
      color,
      weather,
      image: readImageData,
    };

    // *********************** AXIOS ******************************+
    const ip = await Network.getIpAddressAsync();
      try {
         const response = await axios({
          url: `http://${ip}:9000/upload`,
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
    } catch (error) {
      console.error("error is .....", error.response.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          {/* *******************Type:Top/Bottom/OnePiece************* */}
          <Picker
            selectedValue={type}
            onValueChange={(currentType) => setType(currentType)}
          >
            <Picker.Item label="choose type" />
            <Picker.Item label="Top" value="top" />
            <Picker.Item label="bottom" value="bottom" />
            <Picker.Item label="one piece" value="full" />
          </Picker>
          {/* ********************Season******************* */}
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
          {/* *********************Style******************** */}
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
          {/* **************Weather********************* */}
          <Picker
            selectedValue={weather}
            onValueChange={(currentWeather) => setWeather(currentWeather)}
          >
            <Picker.Item label="choose weather" />
            <Picker.Item label="sunny" value="sunny" />
            <Picker.Item label="rainy" value="rainy" />
            <Picker.Item label="snow" value="snow" />
          </Picker>
          {/* <Picker.Item label="holiday" value="holiday" /> */}
          {/* *******************Color********************** */}
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
        {/* **********Save Button******************* */}
        <TouchableOpacity
          onPress={(e) => handleItemSave(e)}
          disabled={!type || !season || !style || !color || !weather}
          style={
            type && season && style && color && weather
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
  weatherBtns: {
    borderWidth: 2,
    padding: 5,
    borderColor: "black",
    backgroundColor: "orange",
  },
});

// Rough
{
  /* <View style={{flexDirection:"row",  justifyContent: "space-around", }}>
          
          <View style={styles.weatherBtns}>
          <Icon
                  name="day-sunny"
                  color="white"
                  size={25}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
          </View>
          <View style={styles.weatherBtns}>     
          <Icon
                  name="rain"
                  color="white"
                  size={25}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
          </View>
          <View style={styles.weatherBtns}>
          <Icon
                  name="snowflake"
                  color="white"
                  size={25}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />  

          </View>
          {/* <Icon
                  name=""
                  color="#FE5F10"
                  size={40}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                /> */
}

{
  /* </View> } */
}
