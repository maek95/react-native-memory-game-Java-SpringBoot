import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from "react-native";
import globalStyles from "../globalStyles";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { host } from "../utils";
import { AuthContext } from "../../AuthContext";
import { router } from "expo-router";

export default function HomeTab() {
 // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [token, setToken] = useState(null);

  const { isLoggedIn, login, logout, token, currentUsername } = useContext(AuthContext);

  const [welcomeMessage, setWelcomeMessage] = useState("");

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
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

  /* function handleLogin(username, password) {
    postLoginUser(username, password)
    login()
  } */
 
  async function postRegisterUser(username, password) {

    try {
      const response = await fetch(`${host}:8080/api/users/register` , { // fill in my current ip-address (hemnätverk)... ipconfig in command prompt and check IPv4 address
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*', // All origins atm...
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // token, needed on create account?
      });

      /* if (!response.ok) {
        throw new Error('Network response was not ok');
      } */
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log('User registered successfully:', data);

    } catch (error) {
      console.log(`Error in ${host}:8080/api/users/register`, error);
    }
  }


  async function postLoginUser(username, password) {

    try {
      const response = await fetch(`${host}:8080/api/login` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*', // All origins atm...
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // token, needed on create account?
      });

      /* if (!response.ok) {
        throw new Error('Network response was not ok');
      } */
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log('Login success:', data);

        if (data.jwt && data.username) {
          //setToken()
          login(data.jwt, data.username);
    
        }

    } catch (error) {
      console.log(`Error in ${host}:8080/api/login`, error);
    }
  }

 
console.log("token: ", token);
console.log("username: ", currentUsername);
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
        {isLoggedIn ? (<>
          
            <Text>Welcome back {currentUsername}</Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/play/selectdifficulty")
              }}
              style={styles.playButton}
            >
              <Text style={styles.playButtonText}>Play</Text>
              <FontAwesome name="play" color={"teal"} size={24} />
            </TouchableOpacity>
         
        <TouchableOpacity onPress={() => {
          logout();
        }} style={styles.loginAndCreateButton}>
              <Text style={styles.buttonText}>Log Out</Text>
              
            </TouchableOpacity>
              </>
            ) : ( // TODO: logged in screen? Play button? profile button? "welcome back, you have beaten Hard Difficulty - try again?!"
          <>
            <TouchableOpacity onPress={() => {
              postLoginUser(usernameLogin, passwordLogin)
            }} style={styles.loginAndCreateButton}>
              <Text style={styles.buttonText}>Log In</Text>
              
            </TouchableOpacity>
            <TextInput style={{backgroundColor: "black", color: "white"}} onChangeText={setUsernameLogin}></TextInput>

            <TextInput style={{backgroundColor: "blue", color: "white"}} onChangeText={setPasswordLogin}></TextInput>

            <TouchableOpacity onPress={() => {
              postRegisterUser(usernameInput, passwordInput)
            }} style={styles.loginAndCreateButton}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TextInput style={{backgroundColor: "black", color: "white"}} onChangeText={setUsernameInput}></TextInput>

            <TextInput style={{backgroundColor: "blue", color: "white"}} onChangeText={setPasswordInput}></TextInput>
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

  },
  playButton: {
    marginBottom: 32,
    marginTop: 32,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 280,
    height: 100,
   /*  borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightblue", */
    //borderRadius: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 16,
     ...Platform.select({
      ios: { // shadow around the whole button, looks elevated
        //shadowColor: 'rgba(0, 150, 136, 1)', 
        shadowColor: 'black',  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
      },
      android: {
        elevation: 20, // shadow on android, only shadow on one side
      },
    }),
  },
  playButtonText: {
    lineHeight: 38, // lineHeight 32 makes it align weird with play-icon
    textAlign: "center",
    color: "teal",
    fontSize: 32,
    // fontWeight: "bold",
    fontFamily: "SourceCodePro-Bold",
  },
});
