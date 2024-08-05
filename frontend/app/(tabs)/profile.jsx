import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { router } from 'expo-router';

export default function ProfileTab() {
  /* need backend for this? or just localStorage to only track highscore until person deletes their localStorage? */
  const { isLoggedIn, currentUsername } = useContext(AuthContext); 

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
           <View style={styles.mainContainer}>
           <View style={styles.mainBorderContainer}>
            </View>
            <View style={styles.mainContentContainer}>

            </View>

           </View>
          </>
        ) : (
          <View style={styles.buttonContainer}>
          
          <Text style={{color: "white", fontFamily: "SourceCodePro-Bold"}}>log in to track your highscores</Text>
            <TouchableOpacity onPress={() => {
              router.push("/login")
            }} style={styles.loginAndCreateButton}>
              <Text style={styles.buttonText}>Log In</Text>
             {/*  <FontAwesome name="arrow-right" color={"teal"} size={24} /> */}
            </TouchableOpacity>
           {/*  <TextInput style={{backgroundColor: "black", color: "white"}} onChangeText={setUsernameLogin}></TextInput>

            <TextInput style={{backgroundColor: "blue", color: "white"}} onChangeText={setPasswordLogin}></TextInput> */}

            <TouchableOpacity onPress={() => {
              router.push("/createAccount")
            }} style={styles.loginAndCreateButton}>
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
    gap: 48,

  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    //height: 300,
    bottom: 0,
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
    
    marginLeft: -19,
    marginRight: -19,
    borderStyle: "solid",
    borderWidth: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: "white",
    marginBottom: -20, // just to take it outside screen/behind tabs menu
  },
  mainContentContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    //width: "100%",
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
    gap: 16,  // for if we have arrow-right
  },
  buttonText: {
    color: "teal",
    fontSize: 24,
   // fontWeight: "bold",
   fontFamily: "SourceCodePro-Bold"
  },
});