import currentIP from "../utils/ip.js";
import Logo from '../assets/Logo.png'
import react, {useState, useContext, useEffect} from "react";
import { userContext } from "../../contexts/userContext.js";
import { colors } from '../styles/globalStyles.js';
import Icon from "react-native-vector-icons/Ionicons";
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity} from "react-native";






export default function UpdateUserScreen(navigation) {

  const [email, setEmail] = ("")
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hidePassword, setHidePassword] = useState(true);
  const { setToken, userEmail, setUserEmail, currentUserId } = useContext(userContext);




  async function updateUser(image) {
    navigation.navigate("User")
    const ip = await currentIP();
    try {
      await axios({
        url: `http://${ip}:9000/users/${currentUserId}}`,
        method: "PUT",
        data: { favorite: !image.favorite },
      });
    } catch (error) {
      console.error("error in PUT", error.response.data);
    }
  }


  

  const handleOpenEye = () => {
    setHidePassword(!hidePassword)
  }

  const saveChanges = async () => {
    // const ip = await Network.getIpAddressAsync();
    const ip = await currentIP()

    const url = `http://${ip}:9000/users/${currentIP}`;
    const payload = {
      email: email,
      password: password,
      repeatPassword: repeatPassword
    }

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
 

    fetch(url, config)
      .then(response => response.json())
      .then(result => {
        

        if (result.error) {
         throw new Error(result.error) 
        }
        setUserEmail(result.userEmail);
        setToken(result.token);
        setPassword(result.password)

        navigation.navigate('UserScreen')
        
      })
      .catch(err => {
        setErrors(err)
       
        
      })
  }

  function DeleteAccount() {

  }
    
    return (
      <View 
      style={styles.cont}>

        <Image
        source={Logo} 
        style={styles.logo}/>

        <View style={styles.formCont}>

        <TextInput
          value          = {userEmail}
          style          = {styles.input}
          placeholder    = "New Email"
          autoCapitalize = "none"
          onSubmitEditing= {(e) =>{
            setUserEmail(e.nativeEvent.text)
            // setSubmit(submit)
          }}
        />

            <TextInput 
              value           = {password}
              placeholder     = "New password"
              onChangeText    = {(text) => setPassword(text)}
              style           = {[styles.input, {position: "relative"}]}
              autoCapitalize  = "none"
              autoComplete    = "off"
              secureTextEntry = {hidePassword}
              icon={ <TouchableOpacity> { hidePassword ? <Icon name="eye-off"solid style={styles.pswIcon} onPress={handleOpenEye}/> : <Icon name="eye"solid style={styles.pswIcon} onPress={handleOpenEye}/>}</TouchableOpacity>}
              iconPosition="right"
            />

            <TextInput 
              value={repeatPassword}
              placeholder="Repeat password"
              autoCapitalize="none"
              autoComplete="off"
              onChangeText={(text) => setRepeatPassword(text)}
              style={styles.input}
              secureTextEntry={hidePassword}
            /> 

            {
            hidePassword ? 
            <Icon 
            name        = "eye-off"solid style={styles.pswIcon}
            onPress     = {handleOpenEye}/>
            : 
            <Icon 
            name        = "eye"
            solid style = {styles.pswIcon}
            onPress     = {handleOpenEye}/>
              }
          
            { errors && errors.message && errors.message.includes("password-too-short") && <Text style={styles.errorMessage}>The password is too short (min 6 characters).</Text>}
            { errors && errors.message && errors.message.includes("password-too-long") && <Text style={styles.errorMessage}>The password is too long (max 20 characters).</Text>}
          

          {/* <Text style={styles.label}>Repeat password:</Text> */}
      
           { password !== repeatPassword && <Text style={styles.errorMessage}>"The passwords don't match." </Text>}

            {hidePassword ? <Icon name="eye-off"solid style={styles.pswIcon} onPress={handleOpenEye}/> : <Icon name="eye"solid style={styles.pswIcon} onPress={handleOpenEye}/>}
          </View>
          
          <View style={styles.btnCont}>

            <TouchableOpacity 
              style     = {styles.saveChangesBtn}
              // onPress   = {SaveChanges}
              >

              <Text 
                style   = {styles.saveTextBtn}>
                Save changes
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
            style          = {styles.deleteAccountBtn}
            onPress        = {DeleteAccount}
              >
            <Text style    = {styles.deleteTextBtn} >Delete account</Text>
            </TouchableOpacity>
          </View>

      </View>
    )    
}

const styles = StyleSheet.create({
  cont: {
    flex           : 1,
    justifyContent : "center",
    alignItems: "center",
    width: "100%"
  },
  logo               : {
    marginBottom       : "20%",
    marginTop          : 50,
    borderRadius       : 50,
    width              : 200,
    height             : 200
    },
  input: {
    width             : "100%",
    borderWidth       : 1,
    borderColor       : "#bbb",
    paddingHorizontal : 8,
    paddingVertical   : 10,
    fontSize          : 14,
    borderRadius      : 5,
    marginTop         : 12,
  },
  formCont: {
    position: "relative",
    width: "90%",
    justifyContent: "center",
    alignItems: "center"

  },
  pswIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 14,
    right: 12,
    color: "gray",
    fontSize: 18
  },
  repeatPswIcon: {
    position: "absolute",
    bottom: 175,
    right: 10,
    fontSize: 17
  },
  btnCont: {
    marginTop: "10%",
  },
  deleteAccountBtn: {
    alignSelf       : "center",
    width           : "90%" ,
    borderWidth     : 2,
    borderRadius    : 5,
    borderColor     : colors.red,
    padding         : 10,
    alignItems      : "center",
    justifyContent  : 'center',
    backgroundColor : colors.red,
    marginTop       : 30,
    marginBottom    : 30
   },
  deleteTextBtn: {
    fontFamily : "LatoRegular",
    fontSize   : 19,
    color      : colors.white,
  },
  saveTextBtn            : {
    fontSize           : 18,
    color              : colors.white
    },
    saveChangesBtn        : {
      alignSelf          : "center",
      width              : "45%" ,
      borderWidth        : 2,
      borderRadius       : 50,
      padding            : 14,
      alignItems         : "center",
      justifyContent     : 'center',
      backgroundColor    : colors.black
      }, 
})
