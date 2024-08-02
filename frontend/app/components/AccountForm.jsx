import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, View } from "react-native";

export default function AccountForm( {setPassword, setUsername, username, password, onPress, buttonText} ) {

  const [errorTextUsernameRequired, setErrorTextUsernameRequired] = useState("");
  const [errorTextPasswordRequired, setErrorTextPasswordRequired] = useState("");
  const [placeholderColorUsername, setPlaceholderColorUsername] = useState("");
  const [placeholderColorPassword, setPlaceholderColorPassword] = useState("");
  

  const handlePress = () => {
    if (!username) {
      setErrorTextUsernameRequired("Required");
      setPlaceholderColorUsername("red");
    }
    if (!password) {
      setErrorTextPasswordRequired("Required");
      setPlaceholderColorPassword("red");
    }
    if (!username || !password) {
      return;  // exit handlePress
    }
    
    setErrorTextPasswordRequired("");
    setPlaceholderColorPassword("");
    setErrorTextUsernameRequired("");
    setPlaceholderColorUsername("");

    onPress();
  };

  return (
    <>
    <View style={styles.inputsContainer}>
       
        <Text style={styles.inputLabelText}>Account Information</Text>
      <TextInput
        placeholder={`Username ${errorTextUsernameRequired}`}
        placeholderTextColor={placeholderColorUsername}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        />
      <TextInput
        placeholder={`Password ${errorTextPasswordRequired}`}
        placeholderTextColor={placeholderColorPassword}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        />
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
        </View>

      <View></View>
      </>
  )
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontFamily: 'SourceCodePro-Regular',

    alignSelf: 'flex-start',
   // marginBottom: 8,
  },
  inputLabelText: {
    alignSelf: "flex-start",
    fontFamily: 'SourceCodePro-Regular',
    color: "white",
  },
  input: {
    fontFamily: 'SourceCodePro-Regular',
    width: '100%',
    padding: 16,
    //marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  inputsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginVertical: 8,
    alignItems: "center",
      
  },
  button: {
   /*  backgroundColor: 'teal',
    padding: 16,
    borderRadius: 4,
    marginTop: 16, */
    //backgroundColor: "white",
    //backgroundColor: ""
    paddingVertical: 8,
    paddingHorizontal: 16,
   // width: 280,
   width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
   /*  color: '#fff',
    fontSize: 16, */
    //color: "teal",
    color: "white",
    fontSize: 16,
   // fontWeight: "bold",
   fontFamily: "SourceCodePro-Bold"
  },

})