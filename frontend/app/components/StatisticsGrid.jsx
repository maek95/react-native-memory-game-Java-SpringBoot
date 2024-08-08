import { ScrollView, StyleSheet, Text, View } from "react-native";


export default function StatisticsGrid() {

  return (

    <View style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}

               
      <Text style={styles.statisticsTitle}>Statistics</Text>
      <View style={styles.gridContainer}>
        <StatisticsGridItem difficultyTitle={"Hard"}/>
        <StatisticsGridItem difficultyTitle={"Medium"}/>
        <StatisticsGridItem difficultyTitle={"Easy"}/>
      </View>
   {/*  </ScrollView> */}
    </View>
    
  
  )
}


function StatisticsGridItem({difficultyTitle}) {

  return (
    <>
      <View style={styles.statisticsGridItem}>
        <View style={styles.statisticsGridRow}>
          <Text style={styles.statisticsGridItemTitle}>{difficultyTitle}</Text>
        </View>
        <View style={styles.statisticsGridRow}>
          <Text style={styles.statisticsGridText}>Games Played: 1</Text>
          <Text style={styles.statisticsGridText}>W/L: 1</Text>
          
        </View>
        <View style={styles.statisticsGridRow}>
        <Text style={styles.statisticsGridText}>
           Win (Perfect): 1
          </Text>
          <Text style={styles.statisticsGridText}>Lose: 1</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    /* borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid", */
   // height: "100%",
   // gap: 36,
   position: "relative",
   height: "100%",
   
  },
  scrollContainer: {
   // paddingBottom: 16,
    //gap: ,
   // flex: 1,
   // justifyContent: "space-between"
   //gap: 16,
  },
  statisticsTitle: {
    fontFamily: "SourceCodePro-Bold",
    color: "white",
    fontSize: 18,
    lineHeight: 18,
    textAlign: "center",
    //paddingTop: 16, // Actually paddingTop 32, we already have padding 16 on mainContentContainer in profile.jsx
  },
  gridContainer: {

    // center of the remainding height below statisticsTitle
   /*  height: "100%",
    justifyContent: "center", */

    // center of 'container'
    position: "absolute",
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    //alignItems: "center",
    gap: 28, // double the gap between 
  },

  statisticsGridItem: {
    // grid doesnt exist in react native apparently
    // display: flex is default
    //justifyContent: "space-evenly",
    gap: 14,
  },
  statisticsGridRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  statisticsGridItemTitle: {
    fontFamily: "SourceCodePro-Bold",
    color: "white",
    lineHeight: 14,
    fontSize: 14,
    
  },
  statisticsGridText: {
    fontFamily: "SourceCodePro-Regular",
    lineHeight: 14,
    fontSize: 14,

    color: "white",
  },

})