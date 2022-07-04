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
} from "react-native";
import CheckBox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome5";
import { globalStyles, colors } from "../styles/globalStyles.js";
import axios from "axios";
import { userContext } from "../../contexts/userContext.js";
import currentIP from "../utils/ip.js";
import { RefreshContext } from "../../contexts/refreshContext.js";

const { width } = Dimensions.get("window");

export default function ClosetScreen() {
  const filterCheckboxes = [
    { id: 1, style: "casual", isChecked: false },
    { id: 2, style: "formal", isChecked: false },
    { id: 3, style: "work", isChecked: false },
    { id: 4, style: "home", isChecked: false },
    { id: 5, color: "black", hex: "#000", isChecked: false },
    { id: 6, color: "white", hex: "#fff", isChecked: false },
    { id: 7, color: "blue", hex: "#1C86EE", isChecked: false },
    { id: 8, color: "red", hex: "#EE3B3B", isChecked: false },
    { id: 9, color: "pink", hex: "#FF82AB", isChecked: false },
    { id: 10, color: "beige", hex: "#E1C699", isChecked: false },
    { id: 11, color: "lightgreen", hex: "#C1FFC1", isChecked: false },
    { id: 12, color: "green", hex: "#2E8B57", isChecked: false },
    { id: 13, color: "gray", hex: "#7A8B8B", isChecked: false },
    { id: 14, color: "gold", hex: "#FFB90F", isChecked: false },
    { id: 15, color: "brown", hex: "#8B4500", isChecked: false },
  ];

  const { token } = useContext(userContext);
  const [closet, setCloset] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [clothFilterOpt, setClothFilterOpt] = useState(filterCheckboxes);
  const [color, setColor] = useState("");
  const { refresh, setRefresh } = useContext(RefreshContext);

  useEffect(() => {
    async function getImagesFromBackend() {
      const ip = await currentIP();
      try {
        const result = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          url: `http://${ip}:9000/cloth/closet`,
        });
        setCloset(result.data);
      } catch (error) {
        console.log("error in receiving images from BE", error);
      }
    }

    getImagesFromBackend();
  }, []);

  //filter button:
  function handleFilterBtn() {
    return setFilterModalVisible(true);
  }

  //handle Style and color checkboxes:
  const handleFilter = (id) => {
    let check = clothFilterOpt.map((item) => {
      if (id === item.id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setClothFilterOpt(check);
  };
  const selectedFilter = clothFilterOpt.filter((item) => item.isChecked);

  // //remove filter: --- take note
  // async function handleFilterRemove(id) {
  //   const ip = await currentIP();

  //   try {
  //     let queryString = selectedFilter
  //       .map((item) => Object.keys(item)[1] + "=" + Object.values(item)[1])
  //       .join("&");
  //     console.log("STRING___:", queryString);
  //     const result = await axios({
  //       method: "get",
  //       url: `http://${ip}:9000/cloth/closet?${queryString}`,
  //     });
  //     setCloset(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // }

  //submit button im filterModal:
  async function handleSubmit() {
    const ip = await currentIP();

    setFilterModalVisible(!filterModalVisible);

    try {
      let queryString = selectedFilter
        .map((item) => Object.keys(item)[1] + "=" + Object.values(item)[1])
        .join("&");
      // console.log("STRING___:", queryString);
      const result = await axios({
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `http://${ip}:9000/cloth/closet?${queryString}`,
      });
      setCloset(result.data);
    } catch (error) {
      console.log("error in handling submit of cloth form", error);
    }
  }

  //3 dots button:
  async function handleDeleteBtn(image) {
    const ip = await currentIP();

    try {
      const result = await axios({
        url: `http://${ip}:9000/cloth/closet/${image._id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCloset(result.data);
      setRefresh(!refresh);
    } catch (error) {
      console.error("error in DELETE", error.response.data);
    }

    // console.log("image.id---", image._id);
    // const ip = await currentIP();
    // try {
    //   await axios.delete(`http://${ip}:9000/cloth/closet/${image._id}`);
    //   // setStatus("Delete successful");
    // } catch (error) {
    //   console.log(error);
    // }
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
                // handleFilter(item.id), handleFilterRemove();
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
                  <Text>season: {image.season}</Text>
                  <Text>style: {image.style}</Text>
                </View>

                <TouchableOpacity
                  style={styles.menuBtn}
                  onPress={() => {
                    handleDeleteBtn(image);
                  }}
                >
                  {/* <Icon style={styles.menuIcon} name="ellipsis-v" size={20} /> */}
                  <Icon style={styles.menuIcon} name="trash" size={20} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>

      {/* //Filter Modal! */}
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
              <View style={styles.modalViewFilter}>
                <Text style={{ fontWeight: "bold" }}>Style:</Text>
                <View style={styles.checkboxContainer}>
                  {clothFilterOpt &&
                    clothFilterOpt.map(
                      (item) =>
                        Object.keys(item)[1] == "style" && (
                          <View style={styles.checkboxConWrapper} key={item.id}>
                            <CheckBox
                              value={item.isChecked}
                              style={styles.checkbox}
                              onValueChange={() => {
                                handleFilter(item.id);
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
                      (item) =>
                        Object.keys(item)[1] == "color" && (
                          <View
                            style={styles.checkboxConWrapper2}
                            key={item.id}
                          >
                            <TouchableOpacity
                              style={[
                                styles.colorBox,
                                { backgroundColor: item.hex },
                              ]}
                              onPress={() => {
                                handleFilter(item.id);
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
        visible={menuModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setMenuModalVisible(!menuModalVisible);
        }}
        statusBarTranslucent={false}
      >
        <View style={styles.centeredViewMenu}>
          <View style={styles.modalViewMenu}>
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

  contentContainer: {
    paddingBottom: 150,
  },

  clothContainer: {
    flex: 1,
    // top: 10,
    // bottom: 150,
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

  centeredViewMenu: {
    flex: 1,
    alignItems: "flex-end",
    position: "relative",
  },

  modalViewMenu: {
    width: "50%",
    height: "30%",
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

  checkbox: {
    color: "blue",
    marginRight: 10,
  },

  checkboxConWrapper2: {
    // flexDirection: "row",
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
