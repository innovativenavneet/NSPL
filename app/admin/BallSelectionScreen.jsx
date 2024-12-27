import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig"; // Adjust the import based on your Firebase setup
// import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique match ID

const db = getFirestore(app);


export default function BallSelectionScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();

  const generateMatchId = () => {
    return 'match_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };
  // Load Fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
          OpenSansSemibold: require("../../assets/fonts/OpenSans_SemiCondensed-SemiBold.ttf"),
        });
        setFontsLoaded(true);
        console.log("Fonts loaded successfully");
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleBallSelection = async (ballType) => {
    try {
      // Generate a unique match ID
      const matchId = generateMatchId(); // Generate a unique match ID

      // Save ball type to Firestore
      const docRef = await addDoc(collection(db, "matchBallSelections"), {
        ballType,
        timestamp: new Date(),
        matchId, // Save the matchId as well
      });
      console.log("Ball selection saved with ID:", docRef.id);

      // Navigate to MatchType screen with ballType and matchId as parameters
      navigation.navigate("MatchType", { ballType, matchId });
    } catch (error) {
      console.error("Error saving ball type:", error);
    }
  };

  return (
    <LinearGradient colors={["#d3d3d3", "#008080"]} style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <Image source={require("../../assets/startingflow/logo.png")} style={styles.logo} />
      </View>

      {/* Button for Leather Ball */}
      <View style={styles.onebutton}>
        <TouchableOpacity style={styles.button} onPress={() => handleBallSelection("Leather Ball")}>
          <Image source={require("../../assets/startingflow/redball.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Leather Ball</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>Which type of Match do you want to add?</Text>

      {/* Button for Tennis Ball */}
      <View style={styles.secondbutton}>
        <TouchableOpacity style={styles.button} onPress={() => handleBallSelection("Tennis Ball")}>
          <Image source={require("../../assets/startingflow/greenball.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Tennis Ball</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { width: 50, height: 50 },
  userIcon: { width: 50, height: 50 },
  question: {
    fontSize: 24, // Slightly larger font size for better visibility
    textAlign: "center",
    color: "#fff", // Ensure text color is visible
    fontFamily: "OpenSansSemibold",
    fontWeight: "bold",
    flex: 1, // Use Flexbox to take up space and align in the center
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
    marginTop: "70%", // Adjust if necessary based on layout
    paddingHorizontal: 20, // Add padding for better spacing on smaller screens
  },  
  
  onebutton: {
    position: "absolute",
    top: 180,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    width: 200,
    justifyContent: "center",
    elevation: 10,
  },
  icon: { width: 25, height: 25, marginRight: 10 },
  buttonText: { fontSize: 16, color: "#000" ,fontWeight: "bold",    fontFamily: "OpenSansSemibold",
  },
  secondbutton: {
    position: "absolute",
    bottom: 210,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
