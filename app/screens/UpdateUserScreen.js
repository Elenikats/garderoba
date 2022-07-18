import react, {useState} from "react";
import currentIP from "../libs/ip.js";
import {View, Text, Button, TextInput, StyleSheet} from "react-native"
import style from "react-native-icon-picker/src/style.js";

export default function UpdateUserScreen(navigation) {

  const [username, setUsername] = useState("")

  async function handleUpdate(image) {
    navigation.navigate("User")

    const ip = await currentIP();

    try {
      await axios({
        url: `http://${ip}:9000/cloth/${image._id}`,
        method: "PUT",
        data: { favorite: !image.favorite },
      });

    } catch (error) {
      console.error("error in PUT", error.response.data);
    }
  }
    
    return (
      <View style={styles.cont}>
        <TextInput
        value={username}
        placeholder="username"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        ></TextInput>

          {/* // <TextInput>Username</TextInput>
          // <TextInput>Email</TextInput>
          // <TextInput>Password</TextInput>
          // <TextInput>Delete Profile</TextInput>  */}

          <Button style={styles.submitBtn} 
          title="Save Changes" 
          onPress={handleUpdate} />
      </View>    
    )    
}

const styles = StyleSheet.create({
  cont: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#bbb",
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14,
    borderRadius: 5,
    marginTop: 12,
  }
})
