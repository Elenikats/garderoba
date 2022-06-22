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
} from "react-native";
import CheckBox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome5";
import { globalStyles, colors } from "../styles/globalStyles.js";
import axios from "axios";
import ColorPalette from "react-native-color-palette";

export default function ClosetScreen() {
  const [closet, setCloset] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [casual, setCasual] = useState(false);
  const [formal, setFormal] = useState(false);
  const [work, setWork] = useState(false);
  const [home, setHome] = useState(false);

  const [color, setColor] = useState("");

  // useEffect(() => {
  //   async function getImagesFromBackend() {
  //     // const ip = await currentIP();
  //     try {
  //       const result = await axios({
  //         method: "get",
  //         url: `http://10.44.57.28:9000/cloth/closet`,
  //       });
  //       console.log("result---", result.data);
  //       setCloset(result.data);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     console.log("closet here", closet);
  //   }

  //   getImagesFromBackend();
  // }, []);

  function handleFilterBtn() {
    return setModalVisible(true);
    console.log("Its working!!");
  }

  function handleMenuBtn() {}

  //handle Category checkboxes:
  function handleCasual() {
    setCasual(!casual);
    setFilterOptions([...filterOptions, "casual"]);
  }

  function handleFormal() {
    setFormal(!formal);
    setFilterOptions([...filterOptions, "formal"]);
  }

  function handleWork() {
    setWork(!work);
    setFilterOptions([...filterOptions, "work"]);
  }

  function handleHome() {
    setHome(!home);
    setFilterOptions([...filterOptions, "home"]);
  }

  return (
    <SafeAreaView>
      {/* <ScrollView> */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => {
            handleFilterBtn();
          }}
        >
          <Icon name="filter" size={30} />
        </TouchableOpacity>
        {filterOptions &&
          filterOptions.map((option) => (
            <Text style={styles.filterOption}>{option}</Text>
          ))}
      </View>
      <View style={styles.clothContainer}>
        {closet &&
          closet.map((image, index) => (
            <View style={styles.clothItem} key={index}>
              <Image
                style={{ width: "40%", height: "40%" }}
                source={{ uri: image.image }}
              />

              {/* <Text>season: {season}</Text>
              <Text>style: {style}</Text> */}

              <TouchableOpacity
                style={styles.menuBtn}
                onPress={() => {
                  handleMenuBtn();
                }}
              >
                <Icon style={styles.menuIcon} name="ellipsis-v" size={10} />
              </TouchableOpacity>
            </View>
          ))}
      </View>
      {/* </ScrollView> */}

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
                <Text style={{ fontWeight: "bold" }}>Category:</Text>
                <View style={styles.checkboxContainer}>
                  <View style={styles.checkboxConWrapper}>
                    <CheckBox
                      value={casual}
                      onValueChange={handleCasual}
                      style={{ marginRight: 10 }}
                    />
                    <Text>casual</Text>
                  </View>
                  <View style={styles.checkboxConWrapper}>
                    <CheckBox
                      value={formal}
                      onValueChange={handleFormal}
                      style={{ marginRight: 10 }}
                    />
                    <Text>formal</Text>
                  </View>
                  <View style={styles.checkboxConWrapper}>
                    <CheckBox
                      value={work}
                      onValueChange={handleWork}
                      style={{ marginRight: 10 }}
                    />
                    <Text>work</Text>
                  </View>
                  <View style={styles.checkboxConWrapper}>
                    <CheckBox
                      value={home}
                      onValueChange={handleHome}
                      style={{ marginRight: 10 }}
                    />
                    <Text>home</Text>
                  </View>
                </View>

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
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={globalStyles.activeButton}>ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    top: 60,

    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  clothContainer: {
    flex: 1,
  },

  clothItem: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
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
