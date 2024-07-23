import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import globalStyles from "../globalStyles";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { host } from "../utils";

export default function HomeTab() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [welcomeMessage, setWelcomeMessage] = useState("");
  /* 
  useEffect(() => {

    fetchMockMessage();

  }, [])

  async function fetchMockMessage() {
    try {
      const response = await fetch("https://run.mocky.io/v3/573146a5-0749-48f6-bbd0-6815adc97adc", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*', // Replace 'your-app-origin' with the appropriate origin
        },
      });
      const data = await response.json();

      if (data.messages) {
        console.log("succesful fetch of mock data");
        setWelcomeMessage(data.messages[0]);
      } else {
        console.log("no data.message?");
      }

    } catch (error) {
      console.error("Failed fetching mock messages: ", error);
    }
  }
 */
  //console.log(welcomeMessage);

  useEffect(() => {
    async function fetchJavaSpringBoot() {

      try {
        const response = await fetch(`${host}:8080/hello` , { // fill in my current ip-address (hemnätverk)... ipconfig in command prompt and check IPv4 address
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Origin': '*', // All origins atm...
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
  
      } catch (error) {
        console.log(`Error fetching ${host}:8080/hello`, error);
      }
    }

    fetchJavaSpringBoot();

  }, [])

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <LinearGradient  
          colors={['transparent', 'rgba(0,0,0,0.3)']}
        //  colors={['transparent', 'rgba(255,255,255,0.5)']} // måste flytta på github-ikonen isåfall
          locations={[0, 1]}
          style={styles.background}
          />{/* SafeAreaView is Teal, and we have a gradient here that has position absolute and is transparent.. */}
      <View style={globalStyles.mainTitleContainer}>
        <Text style={globalStyles.mainTitle}>maek memory{/* font not good for full-caps */}</Text> 
      </View>
      {welcomeMessage !== "" && <Text>{welcomeMessage}</Text>}
      <View style={styles.buttonContainer}>
        {!isLoggedIn && (
          <>
            <TouchableOpacity style={styles.loginAndCreateButton}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginAndCreateButton}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.socialsContainer}>
        <FontAwesome name="github" size={30} color="white" />
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "teal",
    flex: 1,
    padding: 16,
    justifyContent: "center",
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
  buttonContainer: {
    width: "100%",
   /*  backgroundColor: "red", */
    padding: 10,
    alignItems: "center",
    gap: 16,
  },
  loginAndCreateButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 280,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "teal",
    fontSize: 24,
   // fontWeight: "bold",
   fontFamily: "SourceCodePro-Bold"
  },
  socialsContainer: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 16, /* was removed by bottom: 0 ? */
    width: "100%",
    justifyContent: "start",

  }
});
