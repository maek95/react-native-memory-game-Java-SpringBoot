import { ScrollView, StyleSheet, Text, View } from "react-native";


export default function StatisticsGrid() {

  return (

    <View style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}

               
      <Text style={styles.statisticsTitle}>Statistics (placeholder)</Text>
      
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
      <View style={styles.gridItem}>
        <View style={styles.gridItemTitleContainer}>
          <Text style={styles.gridItemTitle}>{difficultyTitle}</Text>
        </View>
        <View style={styles.gridRow}>
          <Text style={styles.gridText}>Games Played: 1</Text>
          <Text style={styles.gridText}>W/L: 1</Text>
          
        </View>
        <View style={styles.gridRow}>
        <Text style={styles.gridText}>
           Win (Perfect): 1
          </Text>
          <Text style={styles.gridText}>Lose: 1</Text>
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
  gridItemTitleContainer: {
    alignItems: "center"
  },

  gridItem: {
    // grid doesnt exist in react native apparently
    // display: flex is default
    //justifyContent: "space-evenly",
    gap: 14,
    
  },
  gridRow: {
    
   // alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  gridItemTitle: {
    fontFamily: "SourceCodePro-Bold",
    color: "white",
    lineHeight: 14,
    fontSize: 14,
    //textAlign: "center",
    
  },
  gridText: {
    fontFamily: "SourceCodePro-Regular",
    lineHeight: 14,
    fontSize: 14,

    color: "white",
  },

})