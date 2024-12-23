import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

export default function BallSelectionScreen({ onAdminAccess }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation(); // Use navigation hook for routing

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
    return null; // Avoid rendering until fonts are loaded
  }

  return (
    <LinearGradient colors={["#d3d3d3", "#008080"]} style={styles.container}>
      {/* Header with logo and admin button */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/startingflow/logo.png")}
          style={styles.logo}
        />

        {/* Admin Button */}
        <TouchableOpacity
          onPress={onAdminAccess}
        >
          <Image
            source={require("../../assets/startingflow/human.png")}
            style={styles.userIcon}
          />
        </TouchableOpacity>
      </View>

      {/* First button */}
      <View style={styles.onebutton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("Navigating to MatchType");
            navigation.navigate("MatchType"); // Navigate to MatchType screen
          }}
        >
          <Image
            source={require("../../assets/startingflow/redball.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Leather Ball</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>Which type of Match do you want to see?</Text>

      {/* Second button */}
      <View style={styles.secondbutton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("Navigating to MatchType");
            navigation.navigate("MatchType");
          }}
        >
          <Image
            source={require("../../assets/startingflow/greenball.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Tennis Ball</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 20,
    textAlign: "center",
    marginVertical: 410,
    color: "#fff",
    fontFamily: "OpenSansSemibold",
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
  secondbutton: {
    position: "absolute",
    bottom: 210,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
