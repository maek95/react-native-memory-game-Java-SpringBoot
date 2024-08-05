import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
/* import globalStyles from '../../globalStyles'; */
import React, { useCallback } from "react";
import { Link, router } from "expo-router";
import { Shadow } from "react-native-shadow-2";
import { LinearGradient } from "expo-linear-gradient";

const difficulties = [
  {
    id: 1,
    title: "Easy",
    sequenceLength: 3,
  },
  {
    id: 2,
    title: "Medium",
    sequenceLength: 4,
  },
  {
    id: 3,
    title: "Hard",
    sequenceLength: 5,
  },
  /* custom */
];

// React.memo... less jumpy/flickering when scrolling?
const DifficultyItem = React.memo(({ title, sequenceLength }) => {
  /* const dynamicItemStyle = {
    backgroundColor: isDone ? "green" : "black",
  }
 */
  const dynamicItemStyle = {
    backgroundColor: title === "easy" ? "green" : "black",
  };

  return (
    <Shadow offset={[0, 8]} style={{ marginBottom: 40 }}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `play/game/${title}`,
            params: { title, sequenceLength },
          })
        }
        style={[
          styles.item /* {backgroundColor: isDone ? "green" : "black"} */,
          ,
          {
            backgroundColor:
              title === "Easy"
                ? "#00FF00"
                : title === "Medium"
                ? "#FFFF00"
                : title === "Hard"
                ? "#FF0000"
                : "black" /* black for custom */,
          },
        ]}
      >
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSequenceLength}>{sequenceLength}</Text>

        {/* <TouchableOpacity onPress={() => {
      navigation.navigate("Details", { title: title, descriptionText: descriptionText, isDone: isDone, id: id})
      }}><FontAwesome name="chevron-right" size={30} color="white" /></TouchableOpacity> */}
      </TouchableOpacity>
    </Shadow>
  );
});

export default function PlayTab() {
  /* start by selecting difficulty, after that we route to game/[difficulty] */

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)"]}
          //colors={['transparent', 'rgba(255,255,255,0.9)']}
          locations={[0, 1]}
          style={styles.background}
        />
        {/* SafeAreaView is Teal, and we have a gradient here that has position absolute and is transparent.. */}

        <Text style={styles.title}>Select Difficulty</Text>

        <FlatList
          contentContainerStyle={{}}
          data={difficulties}
          renderItem={({ item }) => (
            <DifficultyItem
              title={item.title}
              sequenceLength={item.sequenceLength}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    //height: 300,
    bottom: 0,
  },
  title: {
    //fontFamily: "SourceCodePro_400Regular",
    fontFamily: "SourceCodePro-Medium",
    marginTop: 32 /* 48margintop - 16padding from container above */,
    fontSize: 32, 
    lineHeight: 32, // same as fontsize, makes it easier to calculate padding/margins
    color: "white",
    // fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    /* backgroundColor: "black",  */
    padding: 10 
    /* not needed with header shown: */,
    /*  marginTop: 30, */
    /* alignItems: "center",
    justifyContent: "center", */
  },
  flatlist: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1 /* flatlist does not inherit flex from parent or something */,
  },
  glowContainer: {
    // NOT USING, using <Shadow> instead, works for iOS and Android
    ...Platform.select({
      android: {
        borderRadius: 2,
        backgroundColor: "rgba(0, 150, 136, 1)", // Glow color with transparency
        // elevation: 20,
      },
    }),
  },
  item: {
    /*  flex: 1, */
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 20,
    // marginVertical: 8,
    /*  ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 150, 136, 1)', // Glow color
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }), */
  },
  itemTitle: {
    fontFamily: "SourceCodePro-Regular",
    fontSize: 24,
    //fontWeight: "bold", // cant have this and custom font!!!!
    color: "black",

    //fontFamily: Roboto_400Regular,
  },
  itemSequenceLength: {
    fontFamily: "SourceCodePro-Regular",
    fontSize: 20,
    //fontWeight: "bold", // cant have this and custom font!!!
    color: "black",
  },
});
