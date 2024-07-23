import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  mainTitle: {
    fontSize: 60,
    color: "white",
    //fontFamily: "SourceCodePro-Regular",
    //fontWeight: "bold",
    fontFamily: "SourceCodePro-Medium",
    textAlign: "center"
  },
  mainTitleContainer: {
    position: "absolute",
    top: 0,
    width: "100%",

    /* backgroundColor: "black",  */
    padding: 10,
    paddingTop: 40,
   /*  marginTop: 30, */ /* not needed with header shown */
    /* alignItems: "center",
    justifyContent: "center", */
    //textAlign: "center",
  }
  
});

export default globalStyles;