import react from "react";
import { StyleSheet, SafeAreaView, Text, Image, PermissionsAndroid, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function CreateItemScreen({ route }) {
 const { image } = route.params
 console.log("123", image);
  return(
    <>
    <SafeAreaView style={styles.container}>
      <Text>Image Uploaded: </Text>
      <Image 
            source={{ uri : image }}  
            style={{width: 200, 
                    height: 200 }} />
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center', 
    }
});


