import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-svg";
import { host } from "./utils";
import AccountForm from "./components/AccountForm";

export default function Login() {
  const { login } = useContext(AuthContext);
  const local = useLocalSearchParams(); // isNewAccount true if coming from createAccount.jsx ... changes the welcome text

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await fetch(`${host}:8080/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*',
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log('Login success:', data);

      if (data.jwt && data.username) {
        login(data.jwt, data.username);
        router.push("/");
      }
    } catch (error) {
      console.log(`Error in ${host}:8080/api/login`, error);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <LinearGradient  
          colors={['transparent', 'rgba(0,0,0,0.3)']}
        //  colors={['transparent', 'rgba(255,255,255,0.5)']} // måste flytta på github-ikonen isåfall
          locations={[0, 1]}
          style={styles.background} //interferes with space-evenly even though it's invisible.. 
          /> 

      <View style={styles.welcomeTextContainer}>
        {local.isNewAccount ? (<Text style={styles.welcomeText}>Welcome!</Text>)  : (<Text style={styles.welcomeText}>Welcome Back</Text>)}
      </View>
      <AccountForm buttonText={"Log In"} onPress={handleLogin} password={password} username={username} setPassword={setPassword} setUsername={setUsername}  />

      <View></View>
      </SafeAreaView>

        </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    position: "relative",
    backgroundColor: "teal",
    flex: 1,
    padding: 16,
    paddingTop: 0, // since gap will apply a "paddingTop" 16
    gap: 16, // applies gap between top and welcome text due to LinearGradient being an invisible div at the top
    //justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    //height: 300,
    bottom: 0,
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
  welcomeTextContainer: {
   /*  position: "absolute",
    top: 0, */
    //left: 0,
  },
  welcomeText: {
   
    fontFamily: 'SourceCodePro-Regular',
    fontSize: 24, 
   // marginTop: 88,
    //marginBottom: 32,
    color: "white",
    //fontSize: 32, 
    /* marginTop: 32, 
    fontSize: 32, */
  },
  
});
