import React, { useState, useEffect, useContext } from "react";
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
  Alert,
  Pressable,
} from "react-native";
import CheckBox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome5";
import { globalStyles } from "../styles/globalStyles.js";
import axios from "axios";
import { userContext } from "../../contexts/UserContext.js";
import currentIP from "../libs/ip.js";
import { RefreshContext } from "../../contexts/RefreshContext.js";
import { clothOptionsArray } from "../libs/clothFilter.js";
import AppLoader from "./AppLoader.js";

const { width } = Dimensions.get("window");

export default function ClosetScreen() {
  const { token } = useContext(userContext);
  const [closet, setCloset] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [clothFilterOpt, setClothFilterOpt] = useState(clothOptionsArray);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const  [closetIsLoading, setClosetIsLoading] = useState(false);

  const selectedFilter = clothFilterOpt.filter((item) => item.isChecked);

  useEffect(() => {
    async function getImagesFromBackend() {
      const ip = await currentIP();
      try {

        const isAnyFilterChecked = clothFilterOpt.some((item) => item.isChecked)
        if (!isAnyFilterChecked && !filterModalVisible) {
          setClosetIsLoading(true)
        }

        let queryString = selectedFilter
          .map((item) => Object.keys(item)[1] + "=" + Object.values(item)[1])
          .join("&");
        const result = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `http://${ip}:9000/cloth/closet?${queryString}`,
        });
        setCloset(result.data);
        setClosetIsLoading(false);
      } catch (error) {
        console.log("error in receiving images from BE", error);
      }
    }

    getImagesFromBackend();
  }, [refresh, clothFilterOpt]);

  function handleFilterBtn() {
    return setFilterModalVisible(true);
  }

  function updateFilterOptIsCheckedValue(id) {
    let check = clothFilterOpt.map((item) => {
      if (id === item.id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    console.log("check:", check)
    setClothFilterOpt(check);
  }

  function handleRemoveAllFilter() {
    setClothFilterOpt(clothOptionsArray);
    setFilterModalVisible(false);
    setRefresh(!refresh);
  }

  async function handleDeleteBtn(image) {
    const ip = await currentIP();
    try {
      await axios({
        url: `http://${ip}:9000/cloth/closet/${image._id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefresh(!refresh);
    } catch (error) {
      console.error("error in DELETE", error.response.data);
    }
  }

  if (closetIsLoading) {
    return <AppLoader/>
  }

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
        {selectedFilter &&
          selectedFilter.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                updateFilterOptIsCheckedValue(item.id);
              }}
            >
              <Text
                style={
                  item.style
                    ? styles.filterOptionStyle
                    : [styles.filterOptionColor, { backgroundColor: item.hex }]
                }
              >
                {item.style}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.clothContainer}>
          {closet &&
            closet.map((image, index) => (
              <View style={styles.clothItem} key={index}>
                <Image style={styles.image} source={{ uri: image.image }} />
                <View>
                  <Text style={{ fontWeight: "bold" }}>season: </Text>
                  {image.season.map((i, index) => (
                    <Text key={index}>{i}</Text>
                  ))}
                  <Text style={{ fontWeight: "bold", marginTop: 5 }}>
                    style:
                  </Text>
                  <Text>{image.style}</Text>
                </View>

                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => {
                    handleDeleteBtn(image);
                  }}
                >
                  <Icon style={styles.menuIcon} name="trash" size={20} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
      <>
        {filterModalVisible && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={filterModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setFilterModalVisible(!filterModalVisible);
            }}
          >
            <View style={styles.centeredViewFilter}>
              <Pressable
                style={styles.closeModal}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.textStyleX}>X</Text>
              </Pressable>

              <View style={styles.modalViewFilter}>
                <Text style={{ fontWeight: "bold" }}>Style:</Text>
                <View style={styles.checkboxContainer}>
                  {clothFilterOpt &&
                    clothFilterOpt.map(
                      (item, index) =>
                        Object.keys(item)[1] == "style" && (
                          <View style={styles.checkboxConWrapper} key={index}>
                            <CheckBox
                              value={item.isChecked}
                              style={styles.checkbox}
                              onValueChange={() => {
                                updateFilterOptIsCheckedValue(item.id);
                              }}
                            />
                            <Text>{Object.values(item)[1]}</Text>
                          </View>
                        )
                    )}
                </View>

                <Text style={{ fontWeight: "bold" }}>Color:</Text>
                <View style={styles.checkboxContainer}>
                  {clothFilterOpt &&
                    clothFilterOpt.map(
                      (item, index) =>
                        Object.keys(item)[1] == "color" && (
                          <View
                            style={styles.checkboxConWrapper2}
                            key={index}
                          >
                            <TouchableOpacity
                              style={[
                                styles.colorBox,
                                { backgroundColor: item.hex },
                              ]}
                              onPress={() => {
                                updateFilterOptIsCheckedValue(item.id);
                              }}
                            >
                              {item.isChecked ? (
                                <Text
                                  style={[
                                    styles.colorTik,
                                    item.hex == "#000"
                                      ? styles.textWhite
                                      : styles.textBlack,
                                  ]}
                                >
                                  ✔
                                </Text>
                              ) : (
                                <Text> </Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        )
                    )}
                </View>

                <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                  <Text style={globalStyles.activeButton}>ok</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRemoveAllFilter}>
                  <Text
                    style={[
                      globalStyles.activeButton,
                      { backgroundColor: "#FE5F10", width: 130 },
                    ]}
                  >
                    remove all filter
                  </Text>
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
    height: 120,
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contentContainer: {
    paddingBottom: 150,
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
    borderColor: "lightgray",
  },
  menuIcon: {
    padding: 10,
  },
  filterOptionStyle: {
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
  filterOptionColor: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  centeredViewFilter: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  modalViewFilter: {
    width: "80%",
    height: "80%",
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
  closeModal: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 50,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    position: "absolute",
    right: 27,
    top: -10,
    zIndex: 3,
  },
  textStyleX: {
    color: "black",
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  checkboxConWrapper: {
    flexDirection: "row",
    marginVertical: 15,
    marginHorizontal: 5,
  },
  checkbox: {
    color: "blue",
    marginRight: 10,
  },
  checkboxConWrapper2: {
    marginVertical: 15,
    marginHorizontal: 5,
    padding: 5,
  },
  colorBox: {
    borderRadius: 50,
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative",
  },

  colorTik: {
    fontSize: 10,
    paddingVertical: 3,
  },
  textWhite: {
    color: "white",
  },
  textBlack: {
    color: "black",
  },
});
