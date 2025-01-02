import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const db = getFirestore(app);

export default function HandleMatchTypeSelection() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  // Get the ballType and matchId passed from the previous screen
  const { ballType, matchId } = route.params;  

  // Load Fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
          OpenSansSemibold: require("../../assets/fonts/OpenSans_SemiCondensed-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleMatchTypeSelection = async (matchType) => {
    try {
      // Ensure matchId is passed or generated correctly
      if (!matchId) {
        console.error("Match ID is not provided.");
        return;
      }

      // Save matchType to Firestore
      const matchDocRef = doc(db, "matches", matchId);
      await setDoc(matchDocRef, { matchType, ballType }, { merge: true }); // Save ballType and matchType

      console.log("Match type saved successfully:", matchType);

      // Navigate to MatchForm with matchId and matchType
      navigation.navigate("MatchForm", { matchId, matchType ,ballType});
    } catch (error) {
      console.error("Error saving match type:", error);
    }
  };

  return (
    <LinearGradient colors={["#d3d3d3", "#008080"]} style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <Image source={require("../../assets/startingflow/logo.png")} style={styles.logo} />
      </View>

      {/* Button for Women's Match */}
      <View style={styles.onebutton}>
        <TouchableOpacity style={styles.button} onPress={() => handleMatchTypeSelection("Women's Match")}>
          <Text style={styles.buttonText}>Women's Match</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/startingflow/Women.png")} style={styles.women} />
      </View>

      <Text style={styles.question}>Which type of Match do you want to add?</Text>

      {/* Button for Men's Match */}
      <View style={styles.secondbutton}>
        <Image source={require("../../assets/startingflow/Men.png")} style={styles.men} />
        <TouchableOpacity style={styles.button} onPress={() => handleMatchTypeSelection("Men's Match")}>
          <Text style={styles.buttonText}>Men's Match</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, // Allow the content to take up available space
    justifyContent: 'center', // Center content vertically
    paddingBottom: 20, // Padding at the bottom for spacing
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10, // Ensure the header stays on top
  },
  logo: {
    width: 50,
    height: 50,
  },
  userIcon: {
    width: 50,
    height: 50,
  },
  question: {
    fontSize: 24, // Slightly larger font size for better visibility
    textAlign: "center",
    color: "#fff", // Ensure text color is visible
    fontFamily: "OpenSansSemibold",
    fontWeight: "bold",
    marginTop: 80, // Adjust for better positioning
    marginBottom: 40, // Add margin to space out text
    paddingHorizontal: 20, // Padding for responsiveness
  },
  onebutton: {
    alignItems: 'center',
    marginTop: 100, // Space the button down from the top
  },
  women: {
    marginTop: 20,
  },
  men: {
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    width: 200,
    justifyContent: 'center',
    elevation: 10,
    marginBottom: 20, // Space out the buttons
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  secondbutton: {
    alignItems: 'center',
  },
});

