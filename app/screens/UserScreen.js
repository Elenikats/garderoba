import currentIP from "../libs/ip.js";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../styles/globalStyles.js";
import { userContext } from "../../contexts/UserContext.js";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Modal,
  Alert,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";


export default function UserScreen({ navigation }) {
  const [pen, setPen] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, userEmail, setUser, setToken, setUserEmail, currentUserId } = useContext(userContext);

  useEffect(() => {

    async function fetchData() {

      const ip = await currentIP();
      const url = `http://${ip}:9000/users/${currentUserId}`;

      const payload = {
        username: user,
        email: userEmail,
      };

      const config = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      console.log("payload:", payload);
      fetch(url, config)
      .then((response) => response.json())
      .then((result) => console.log("result .....", result));
    }

    fetchData();
  }, [user, userEmail]);

  function handleLogout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setToken(null);
          setUser(null);
          setUserEmail(null);
          navigation.navigate("EndScreen", { name: "EndScreen" });
        },
      },
    ]);
  }
  async function launchCamera() {
    try {
      const options = { quality: 0.5, base64: true };
      const data = await ImagePicker.launchCameraAsync(options);
      console.log(data.base64.length);
      if (!data.cancelled) {
        navigation.navigate("User", {
          image: data.uri,
        });
        async function fetchData() {
          const ip = await currentIP();
          const url = `http://${ip}:9000/users/${currentUserId}`;
          const payload = {
            profileImage: data.uri,
          };
          const config = {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          };
          console.log("payload:", payload);
          fetch(url, config)
          .then((response) => response.json())
          .then((result) => setProfileImage(result.profileImage));
        }

        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function launchGallery() {
    try {
      const options = { allowsMultipleSelection: true, base64: true };
      const data = await ImagePicker.launchImageLibraryAsync(options);
      console.log(data.base64.length);
      if (!data.cancelled) {
        navigation.navigate("User", {
          image: data.uri,
        });
        async function fetchData() {
          const ip = await currentIP();
          const url = `http://${ip}:9000/users/${currentUserId}`;
          const payload = {
            profileImage: data.uri,
          };
          const config = {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          };
          console.log("payload:", payload);
          fetch(url, config)
            .then((response) => response.json())
            .then((result) => setProfileImage(result.profileImage));
        }

        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handlePen() {
    setPen(!pen);
  }

  return (
    <View style={styles.cont}>
      <View style={styles.subCont}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/closetDoors.jpg")}
        />

        <View style={styles.profileImageCont}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={styles.profileImage}
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../assets/userImage.png")
              }
            />
          </TouchableOpacity>
        </View>

        {/*......UserName, Pen and Email......*/}

        <View style={styles.nameAndEmail}>
          {pen ? (
            <View style={styles.nameAndPenCon}>
              <Text style={styles.name}>{user}</Text>
              <TouchableOpacity onPress={handlePen}>
                <Image
                  autoFocus
                  style={styles.pen}
                  source={require("../assets/edit.png")}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TextInput
              style={styles.newUsername}
              placeholder="New username"
              autoCapitalize="none"
              autoComplete="off"
              onSubmitEditing={(e) => {
                setUser(e.nativeEvent.text);
                setPen(!pen);
              }}
            >
              {user}
            </TextInput>
          )}

          <Text style={styles.email}>{userEmail}</Text>
        </View>
        {/*...................................*/}

        <View style={styles.settingsCont}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UpdateUser");
            }}
          >
            <Text style={styles.settings}>
              Settings
              <Image
                style={styles.arrow}
                source={require("../assets/arrow.png")}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TermsAndConditions");
            }}
          >
            <Text style={styles.settings}>
              Terms & Conditions
              <Image
                style={styles.arrow}
                source={require("../assets/arrow.png")}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.settings}>
              Logout
              <Image
                style={styles.arrow}
                source={require("../assets/arrow.png")}
              />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.link}>
              Link to DevWebsite
              {/* <Link to={{}}/> */}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <>
        {modalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={styles.closeModal}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyleX}>X</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    launchCamera();
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Camera</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    launchGallery();
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Gallery</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </>
    </View>
  );
}
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "white",
  },
  subCont: {
    marginTop: 40,
    // padding        : 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    height: 200,
    width: 393,
  },
  profileImageCont: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginTop: -70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  nameAndEmail: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  nameAndPenCon: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: 14,
  },
  email: {
    fontStyle: "italic",
    fontSize: 13,
    color: "gray",
  },
  settingsCont: {
    width: 380,
    height: 270,
    borderRadius: 5,
    shadowOpacity: 1,
    elevation: 5,
    marginTop: 35,
    justifyContent: "space-around",
    // alignItems     : 'center'
  },
  settings: {
    marginLeft: 30,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  circle: {
    zIndex: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#F5F5F5",
    shadowColor: "#27272A",
    shadowOpacity: 0.25,
    elevation: 5,
    top: -5,
    width: 70,
    height: 70,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  closeModal: {
    borderWidth: 0.5,
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 5,
    position: "absolute",
    right: -5,
    top: -7,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 70,
  },
  modalView: {
    width: "50%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pen: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  button: {
    width: "100%",
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.black,
  },
  buttonOpen: {
    backgroundColor: colors.black,
  },
  buttonClose: {
    backgroundColor: colors.black,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  link: {
    marginLeft: 30,
    color: "blue",
  },
});
