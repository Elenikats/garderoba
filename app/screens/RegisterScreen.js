import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, TextInput, ScrollView, Button } from 'react-native'
import { globalStyles } from '../styles/globalStyles';


export default function RegisterScreen() {
  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [repeatPassword, onChangeRepeatPassword] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.regform}>
        <Text style={[styles.header]}>Garderoba logo</Text>

        <Button 
          title="Sign in with Google"
          onPress={() => {console.log("pressed button")}}
          style={styles.googleButton}
        ></Button>

        <View style={globalStyles.container}>
          <Text style={globalStyles.text}>or</Text>
          <Text style={globalStyles.text}>Register with email</Text>
        </View>

        <Text style={styles.label}>Name:</Text>
        <TextInput 
          style={styles.textInput}
        ></TextInput>

        <Text style={styles.label}>Email:</Text>
        <TextInput 
          style={styles.textInput}
        ></TextInput>

        <Text style={styles.label}>Password:</Text>
        <TextInput 
          style={styles.textInput}
        ></TextInput>

        <Text style={styles.label}>Repeat password:</Text>
        <TextInput 
          style={styles.textInput}
        ></TextInput>

        <Text>Terms and conditions</Text>

        <Button 
          title="Sign up"
          onPress={() => {console.log("pressed button")}}
          style={styles.registerButton}
        ></Button>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "lightblue"
  },
  regform: {
    alignSelf: "center",
    backgroundColor: "pink",
    borderWidth: 1,
  }, 
  header: {
    fontSize: 28,
    padding: "10%",
    borderWidth: 1,
    borderWidth: 1
  },
  googleButton: {
    padding: 30,
    color: "red"
  },
  label: {
    paddingTop: 30,
    marginBottom: 5,
    fontSize: 14
  },
  textInput: {
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: 16
  }
})