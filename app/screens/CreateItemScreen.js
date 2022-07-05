import { useState, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles, colors } from "../styles/globalStyles.js";
import ColorPalette from "react-native-color-palette";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import currentIP from "../utils/ip.js";
import { userContext } from "../../contexts/userContext.js";
import { RefreshContext } from "../../contexts/refreshContext.js";


export default function CreateItemScreen({ route, navigation }) {
  const [color, setColor]     = useState("");
  const [season, setSeason]   = useState("");
  const [style, setStyle]     = useState("");
  const [type, setType]       = useState("");
  // const [weather, setWeather] = useState("");
  const { image }             = route.params;
  const { token, userObj }    = useContext(userContext);
  const {refresh, setRefresh} = useContext(RefreshContext)
  
  const imageBase64Converter = async () => {
    const imageAsString = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const base64Image = "data:image/png;base64," + imageAsString;
    return base64Image;
  };

  const handleItemSave = async (e) => {
    e.preventDefault();

    const base64Image = await imageBase64Converter();
    const payload = {
      type,
      season,
      style,
      color,
      user: userObj._id,
      image: base64Image,
    };

    // *********************** AXIOS ******************************+
    const ip = await currentIP();

    try {
      const response = await axios({
        url: `http://${ip}:9000/upload`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
        method: "POST",
      });

      if (response.data) {
        setRefresh(!refresh)
        navigation.navigate("Main");
      } 
      
    } catch (error) {
      console.error("error in POST to upload an item", error.response.data);
      alert("oops somethings wrong, try again!");
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
            <Picker.Item label="summer" value="summer" />
            <Picker.Item label="in-between" value="in-between" />
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
            <Picker.Item label="sports" value="sports" />
            <Picker.Item label="night-out" value="night-out" />
            <Picker.Item label="lounge-wear" value="lounge-wear" />
            <Picker.Item label="rainy" value="rainy" />

          </Picker>
          {/* *******************Color********************** */}
          <ColorPalette
            selectedValue={color}
            onChange={(currentColor) => setColor(currentColor)}
            colors={[
              "#fff",
              "#7A8B8B",
              "#000",
              "#1C86EE",
              "#EE3B3B",
              "#FF82AB",
              "#E1C699",
              "#C1FFC1",
              "#2E8B57",
              "#FFB90F",
              "#8B4500",
              "#C4FFFD",
              "#7F09E3"
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
          disabled={!type || !season || !style || !color }
          style={
            type && season && style && color 
              ? globalStyles.activeButton
              : globalStyles.inactiveButton
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
