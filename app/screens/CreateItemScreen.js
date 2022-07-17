import { useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from "../styles/globalStyles.js";
import ColorPalette from "react-native-color-palette";
import CheckBox from "expo-checkbox";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import currentIP from "../libs/ip.js";
import { userContext } from "../../contexts/UserContext.js";
import { RefreshContext } from "../../contexts/RefreshContext.js";
import { clothOptionsArray } from "../libs/clothFilter.js";


async function getPresignedUrl(fileName,token){
  const ip = await currentIP();
  try {
    const response = await axios({
      url: `http://${ip}:9000/presignedUrl?filename=${fileName}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "get",
    });
    const signedUrl = response.data
    return signedUrl;

    // if (response.data) {
    //   setRefresh(!refresh);
    //   navigation.navigate("Main");
    // }
  } catch (error) {
    console.error("error in POST to upload an item", error.response.data);
    alert("oops somethings wrong, try again!");
  }
}

async function makeAWSRequest(url,file){
  console.log("makeAWSReq,url, file:", url);
  const response = await fetch(url, {method: 'PUT', body: file});
  console.log(response);
  return response;
}



export default function CreateItemScreen({ route, navigation }) {
  const [color, setColor] = useState("");
  const [selectedSeason, setSelectedSeason] = useState([]);
  const [style, setStyle] = useState("");
  const [type, setType] = useState("");
  const { image } = route.params;
  const { token, userObj } = useContext(userContext);
  const { refresh, setRefresh } = useContext(RefreshContext);

  const imageBase64Converter = async () => {
    const imageAsString = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const base64Image = "data:image/png;base64," + imageAsString;
    return base64Image;
  };

  function handleSeason(season) {
    const findSeason = selectedSeason.find((item) => season == item);
    if (findSeason) {
      const removeSeason = selectedSeason.filter((item) => findSeason != item);
      setSelectedSeason(removeSeason);
      return;
    }
    setSelectedSeason([...selectedSeason, season]);
  }

  const handleItemSave = async (e) => {
    e.preventDefault();

    const splittedData = image.split("/ImagePicker/")
    const fileName = splittedData[splittedData.length-1]
    
    const preSignedUrl = await getPresignedUrl(fileName,token);
    let img = await fetch(image);
    img = await img.blob();

    const file = new File([img], fileName);
    const link = await makeAWSRequest(preSignedUrl,file);
    console.log("link", link);

    // const base64Image = await imageBase64Converter();
    const payload = {
      type,
      season: selectedSeason,
      style,
      color,
      user: userObj._id,
      image: base64Image,
    };

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
        setRefresh(!refresh);
        navigation.navigate("Main");
      }
    } catch (error) {
      console.error("error in POST to upload an item", error.response.data);
      alert("oops somethings wrong, try again!");
    }
  };
  return (
    <SafeAreaView style={{ marginTop: "20%" }}>
      <View>
        <View>
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, alignSelf: "center" }}
          />
          <View style={{ margin: 20, alignSelf: "center" }}>
          
            <View style={{ marginBottom: 20, flexDirection: "row" }}>
              {clothOptionsArray.map(
                (item) =>
                  Object.keys(item)[1] == "type" && (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => setType(item.type)}
                    >
                      <Text
                        style={
                          type && type === item.type
                            ? [
                                globalStyles.activeButton,
                                { backgroundColor: "#FE5F10" },
                              ]
                            : globalStyles.activeButton
                        }
                      >
                        {item.type}
                      </Text>
                    </TouchableOpacity>
                  )
              )}
            </View>

            <View style={{ marginBottom: 20, flexDirection: "row" }}>
              {clothOptionsArray.map(
                (item, index) =>
                  Object.keys(item)[1] == "season" && (
                    <View key={index} style={{ margin: 20 }}>
                      <CheckBox
                        value={
                          selectedSeason.includes(item.season) ? true : false
                        }
                        onValueChange={() => {
                          handleSeason(item.season);
                        }}
                      />
                      <Text>{item.season}</Text>
                    </View>
                  )
              )}
            </View>

            <Picker
              selectedValue={style}
              onValueChange={(currentStyle) => setStyle(currentStyle)}
            >
              <Picker.Item label="choose style" />
              {clothOptionsArray.map(
                (item) =>
                  Object.keys(item)[1] == "style" && (
                    <Picker.Item
                      key={item.id}
                      label={item.style}
                      value={item.style}
                    />
                  )
              )}
            </Picker>
          </View>
  
          <View style={{ marginBottom: 20 }}>
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
                "#7F09E3",
              ]}
              title={"choose color:"}
              icon={
                <Text
                  style={
                    color == "#000" ? { color: "white" } : { color: "black" }
                  }
                >
                  ✔
                </Text>
              }
            />
          </View>
        </View>
  
        <TouchableOpacity
          onPress={(e) => handleItemSave(e)}
          disabled={!type || !selectedSeason || !style || !color}
        >
          <Text
            style={
              type && selectedSeason && style && color
                ? globalStyles.activeButton
                : globalStyles.inactiveButton
            }
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
