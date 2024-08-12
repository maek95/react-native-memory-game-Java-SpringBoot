import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { host } from "./utils";
//import { FontAwesome } from "@expo/vector-icons"; // same thing?
import FontAwesome from 'react-native-vector-icons/FontAwesome' 
import AccountForm from "./components/AccountForm";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const [isNewAccount, setIsNewAccount] = useState(true);

  async function handleRegister() {
    try {
      const response = await fetch(`${host}:8080/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*',
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // not using cookies, unnecessary
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log('User registered successfully:', data);


      setIsAccountCreated(true);
     /*  setTimeout(() => {
        
        router.push("/login");
      }, 3000); */
    } catch (error) {
      console.log(`Error in ${host}:8080/api/users/register`, error);
    }
  }

  useEffect(() => {
    setIsAccountCreated(false);
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <LinearGradient  
          colors={['transparent', 'rgba(0,0,0,0.3)']}
        //  colors={['transparent', 'rgba(255,255,255,0.5)']} // måste flytta på github-ikonen isåfall
          locations={[0, 1]}
          style={styles.background} //interferes with space-evenly even though it's invisible.. 
          /> 
      <View style={styles.loadingScreen}></View>
      <View style={styles.welcomeTextContainer}>
        
       {isAccountCreated ? (<Text style={styles.welcomeText}>Account {username} created!</Text>) : (<Text style={styles.welcomeText}>Let's get started</Text>)}
      </View>
      {isAccountCreated ? (<View style={styles.toLoginButtonContainer}>
            <TouchableOpacity onPress={() => router.push({
                pathname: `/login`,
                params: { isNewAccount }
              })} style={styles.toLoginButton}>
                <Text style={styles.toLoginButtonText}>Log In</Text>
                <FontAwesome name="arrow-right" color={"teal"} size={24} /> 
            </TouchableOpacity>
          </View> ) : (
         <AccountForm buttonText={"Create Account"} onPress={handleRegister} password={password} username={username} setPassword={setPassword} setUsername={setUsername}/>
        )}

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
  toLoginButtonContainer: {
    width: "100%",
   /*  backgroundColor: "red", */
    padding: 10,
    alignItems: "center",
    gap: 16,
  },
  toLoginButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    //width: 280,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
    
  },
  toLoginButtonText: {
    color: "teal",
    fontSize: 24,
   // fontWeight: "bold",
   fontFamily: "SourceCodePro-Bold"
  },
});
