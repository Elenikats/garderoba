import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import CheckBox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome5";
import { globalStyles, colors } from "../styles/globalStyles.js";
import axios from "axios";
import ColorPalette from "react-native-color-palette";

const { width } = Dimensions.get("window");

export default function ClosetScreen() {
  const filterCheckboxes = [
    { id: 1, style: "casual", isChecked: false },
    { id: 2, style: "formal", isChecked: false },
    { id: 3, style: "work", isChecked: false },
    { id: 4, style: "home", isChecked: false },
    { id: 5, color: "black", isChecked: false },
  ];
  const [closet, setCloset] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [clothStyle, setClothStyle] = useState(filterCheckboxes);
  const [color, setColor] = useState("");

  useEffect(() => {
    async function getImagesFromBackend() {
      // const ip = await currentIP();
      try {
        const result = await axios({
          method: "get",
          url: `http://192.168.2.123:9000/cloth/closet`,
        });
        console.log("result---", result.data);
        setCloset(result.data);
      } catch (error) {
        console.log(error);
      }

      console.log("closet here", closet);
    }

    getImagesFromBackend();
  }, []);

  //filter button:
  function handleFilterBtn() {
    return setModalVisible(true);
  }

  //handle Style checkboxes:
  const handleFilterStyle = (id) => {
    let check = clothStyle.map((style) => {
      if (id === style.id) {
        return { ...style, isChecked: !style.isChecked };
      }
      return style;
    });
    setClothStyle(check);
  };
  const selectedStyle = clothStyle.filter((style) => style.isChecked);

  //submit button im Modal:
  async function handleSubmit() {
    setModalVisible(!modalVisible);
    console.log("color---:", color);

    try {
      let queryString = selectedStyle
        .map((item) => Object.keys(item)[1] + "=" + Object.values(item)[1])
        .join("&"); //--this will go after the url
      console.log("STRING___:", queryString);
      const result = await axios({
        method: "get",
        url: `http://192.168.2.123:9000/cloth/closet?${queryString}`,
      });
      setCloset(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  //3 dots button:
  function handleMenuBtn() {}

  return (
    <SafeAreaView>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => {
            handleFilterBtn();
          }}
        >
          <Icon name="filter" size={30} />
        </TouchableOpacity>
        {selectedStyle &&
          selectedStyle.map((option) => (
            <TouchableOpacity
              onPress={() => {
                handleFilterStyle(option.id);
              }}
            >
              <Text style={styles.filterOption}>{option.style}</Text>
            </TouchableOpacity>
          ))}
      </View>
      <ScrollView>
        <View style={styles.clothContainer}>
          {closet &&
            closet.map((image, index) => (
              <View style={styles.clothItem} key={index}>
                <Image style={styles.image} source={{ uri: image.image }} />
                <View>
                  <Text>season: {image.category}</Text>
                  <Text>style: {image.style}</Text>
                </View>

                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => {
                    handleMenuBtn();
                  }}
                >
                  <Icon style={styles.menuIcon} name="ellipsis-v" size={20} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>

      {/* //Filter Modal! */}
      <>
        {modalVisible && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ fontWeight: "bold" }}>Style:</Text>
                <View style={styles.checkboxContainer}>
                  {clothStyle &&
                    clothStyle.map((item) => (
                      <View style={styles.checkboxConWrapper}>
                        <CheckBox
                          value={item.isChecked}
                          onValueChange={() => {
                            handleFilterStyle(item.id);
                          }}
                          style={{ marginRight: 10 }}
                        />
                        <Text>{Object.values(item)[1]}</Text>
                      </View>
                    ))}
                </View>

                {/* <ColorPalette
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
                  title={"Color:"}
                  icon={
                    <Text
                      style={
                        color == "#000" ? styles.textWhite : styles.textBlack
                      }
                    >
                      ✔
                    </Text>
                  }
                /> */}
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={globalStyles.activeButton}>ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </>
      {/* // 3 dots Modal! */}
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setMenuModalVisible(!menuModalVisible);
        }}
      >
        <View>
          <View>
            <TouchableOpacity>
              <Text>Delete cloth</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    top: 60,
    height: 120,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  clothContainer: {
    flex: 1,
  },

  clothItem: {
    width: width,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#Fff",
    shadowColor: "#27272A",
    shadowOpacity: 0.25,
    elevation: 5,
    margin: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    justifyContent: "space-around",
    flexDirection: "row",
  },

  image: {
    width: 100,
    height: 100,
    // borderWidth: 1,
    borderColor: "lightgray",
  },

  menuIcon: {
    position: "absolute",
    bottom: 30,
  },
  filterOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#FE5F10",
    color: "white",
    textAlign: "center",
  },

  centeredView: {
    flex: 1,

    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    width: "80%",
    height: "60%",

    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkboxConWrapper: {
    flexDirection: "row",
    marginVertical: 15,
    marginHorizontal: 5,
  },
});
