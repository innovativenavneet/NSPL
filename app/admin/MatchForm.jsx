import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig"; // Adjust this import based on your Firebase setup

// Initialize Firestore
const db = getFirestore(app);

const MatchForm = () => {
  // State variables for match details
  const [matchName, setMatchName] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  // Retrieve matchId, matchType, and ballType from the route parameters
  const { matchId, matchType, ballType } = route.params || {};

  const handleSaveMatchDetails = async () => {
    // Validate required fields
    if (!matchName || !teamA || !teamB) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    console.log("Attempting to save match details...");
    console.log("Match details:", { matchId, matchName, teamA, teamB, matchType, ballType });

    try {
      // Reference Firestore document using matchId
      const matchDocRef = doc(collection(db, "matches"), matchId);
      console.log("Firestore doc reference:", matchDocRef.path);

      // Save match details to Firestore
      await setDoc(
        matchDocRef,
        {
          matchName,
          teamA,
          teamB,
          matchType,
          ballType,
        },
        { merge: true } // Merge allows partial updates without overwriting other fields
      );

      Alert.alert("Success", "Match details saved successfully.");
      console.log("Navigating to MatchUpdateScreen with params:", { matchId, matchType, ballType });

      // Navigate to the MatchUpdateScreen with the match details
      navigation.navigate("MatchUpdateScreen", { matchId, matchType, ballType });
    } catch (error) {
      console.error("Error saving match details:", error);
      Alert.alert("Error", "Failed to save match details. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Match and Team Names</Text>
      <TextInput
        style={styles.input}
        placeholder="Match Name"
        placeholderTextColor="#555"
        value={matchName}
        onChangeText={setMatchName}
      />
      <TextInput
        style={styles.input}
        placeholder="Team Name A"
        placeholderTextColor="#555"
        value={teamA}
        onChangeText={setTeamA}
      />
      <TextInput
        style={styles.input}
        placeholder="Team Name B"
        placeholderTextColor="#555"
        value={teamB}
        onChangeText={setTeamB}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveMatchDetails}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#13808B",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 45,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0aa1a1",
  },
});

export default MatchForm;
