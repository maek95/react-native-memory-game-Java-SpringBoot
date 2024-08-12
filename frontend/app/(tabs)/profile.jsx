import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { router, useFocusEffect } from "expo-router";
import StatisticsGrid from "../components/StatisticsGrid";
import { host } from "../utils";

export default function ProfileTab() {
  /* need backend for this? or just localStorage to only track highscore until person deletes their localStorage? */
  const { isLoggedIn, currentUsername, token } = useContext(AuthContext);
  const [hardestDifficulty, setHardestDifficulty] = useState("");
 

  // useFocusEffect triggers every time we enter/focus this Tab... useEffect only triggers the first time you enter...
  useFocusEffect(

    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  async function fetchUserProfile() {
    try {
      const response = await fetch(`${host}:8080/api/users/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*',
        },
        body: JSON.stringify({ token }),
        //credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      } else {

        const data = await response.json();
        console.log('User profile extracted from backend successfully:', data);

        if (data.highscore) {
          setHardestDifficulty(data.highscore.title);
        }
      }



      //setIsAccountCreated(true);
     /*  setTimeout(() => {
        
        router.push("/login");
      }, 3000); */
    } catch (error) {
      console.log(`Error in ${host}:8080/api/users/profile`, error);
    }
  }




  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)"]}
          //colors={['transparent', 'rgba(255,255,255,0.9)']}
          locations={[0, 1]}
          style={styles.background}
        />

        {isLoggedIn ? (
          <>
            <Text style={styles.title}>{currentUsername}</Text>
            <Image
              source={require("../../assets/green-android-3D.png")}
              style={styles.avatar}
            ></Image>
            {hardestDifficulty ? <Text style={styles.hardestDifficultyText}>Perfected {hardestDifficulty} difficulty</Text> : <Text style={styles.hardestDifficultyText}>You have not beaten any difficulty... yet</Text>}

            <View style={styles.mainContainer}>
              <View style={styles.mainBorderContainer}></View>
              <View style={styles.mainContentContainer}>
                
                <StatisticsGrid/>

              </View>
            </View>
          </>
        ) : (
          <View style={styles.buttonContainer}>
            <Text style={{ color: "white", fontFamily: "SourceCodePro-Bold" }}>
              log in to track your highscores
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/login");
              }}
              style={styles.loginAndCreateButton}
            >
              <Text style={styles.buttonText}>Log In</Text>
              {/*  <FontAwesome name="arrow-right" color={"teal"} size={24} /> */}
            </TouchableOpacity>
            {/*  <TextInput style={{backgroundColor: "black", color: "white"}} onChangeText={setUsernameLogin}></TextInput>

            <TextInput style={{backgroundColor: "blue", color: "white"}} onChangeText={setPasswordLogin}></TextInput> */}

            <TouchableOpacity
              onPress={() => {
                router.push("/createAccount");
              }}
              style={styles.loginAndCreateButton}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        )}
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
    justifyContent: "start",
    alignItems: "center",
    gap: 24,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    //height: 300,
    bottom: 0,
  },
  avatar: {
    width: 80, // width auto doesnt work apparently, but seems to scale proportionally anyways
    height: 80,
    //borderRadius: 50,
    // backgroundColor: "transparent",
  },
  title: {
    //fontFamily: "SourceCodePro_400Regular",
    fontFamily: "SourceCodePro-Medium",
    fontSize: 32,
    lineHeight: 32, // same as fontsize, makes it easier to calculate padding/margins
    color: "white",
    // fontWeight: "bold",
    textAlign: "center",
    marginTop: 32 /* 48margintop - 16padding from container above */,
  },
  hardestDifficultyText: {
    fontFamily: "SourceCodePro-Regular",
    fontSize: 14,
    lineHeight: 14,

    color: "white",
  },
  mainContainer: {
    position: "relative",
    flex: 1, // take up remaining space downwards
    width: "100%",
    /*  marginRight: "-10%",
    marginLeft: "-10%", */
  },
  mainBorderContainer: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    marginLeft: -19, // we will see the border curving down to the left and right, but they will be hidden after that (outside of the screen)
    marginRight: -19,
    borderStyle: "solid",
    borderWidth: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: "white",
    borderBottomWidth: 0,
    //marginBottom: -20, // just to take the border outside screen/behind tabs menu
  },
  mainContentContainer: {
    /* position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, */
    marginTop: 16, // same as padding 16 in 'container'
    display: "flex",
    width: "100%",
    //flex: 1,

    /*  borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black", */
  },
 
  

  buttonContainer: {
    width: "100%",
    /*  backgroundColor: "red", */
    padding: 10,
    paddingTop: 0, //
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
    flexDirection: "row", // for if we have arrow-right
    gap: 16, // for if we have arrow-right
  },
  buttonText: {
    color: "teal",
    fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "SourceCodePro-Bold",
  },
});
