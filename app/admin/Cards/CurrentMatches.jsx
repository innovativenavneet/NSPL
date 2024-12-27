import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";

const LiveMatches = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all matches from Firestore
  const fetchMatches = () => {
    setLoading(true);
    const matchesCollectionRef = collection(db, "matches");
    onSnapshot(
      matchesCollectionRef,
      (querySnapshot) => {
        const fetchedMatches = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatches(fetchedMatches);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching match data:", error);
        setLoading(false);
      }
    );
  };

  // Delete match from Firestore
  const deleteMatch = (matchId) => {
    Alert.alert("Delete Match", "Are you sure you want to delete this match?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            const matchDocRef = doc(db, "matches", matchId);
            await deleteDoc(matchDocRef);
            setMatches(matches.filter((match) => match.id !== matchId)); // Remove match from state
          } catch (error) {
            console.error("Error deleting match:", error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#13808B" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../../assets/startingflow/CricketBall.png")}
          style={styles.logo}
        />
        <Text style={styles.header}>Current Matches</Text>
      </View>

      <ScrollView>
        {matches.length > 0 ? (
          matches.map((match) => (
            <View key={match.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>
                  {match.matchName || "Match Name Unavailable"}
                </Text>
                <View style={styles.statusContainer}>
                  <Icon name="radio-button-on" size={14} color="#03CAAA" />
                  <Text style={styles.status}>Live</Text>
                </View>
              </View>
              <View style={styles.teamsContainer}>
                <Icon name="shirt-outline" size={20} color="#fff" />
                <Text style={styles.team}>
                  {match.battingTeam || "Batting Team"}
                </Text>
                <Text style={styles.score}>
                  {match.score?.runs || 0}/{match.score?.wickets || 0}
                </Text>
              </View>
              <View style={styles.teamsContainer}>
                <Icon name="shield-outline" size={20} color="#fff" />
                <Text style={styles.team}>
                  {match.bowlingTeam || "Bowling Team"}
                </Text>
                <Text style={styles.score}>
                  {match.score?.overs || "0.0"} overs
                </Text>
              </View>
              <Text style={styles.note}>
                <Icon name="information-circle-outline" size={16} color="#fff" />{" "}
                {match.note || "Additional Information"}
              </Text>

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteMatch(match.id)}
              >
                <Icon name="trash-bin-outline" size={16} color="#fff" />
                <Text style={styles.deleteButtonText}> Delete</Text>
              </TouchableOpacity>

              {/* Update Button */}
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() =>
                  navigation.navigate("MatchUpdateScreen", {
                    matchId: match.id,
                    updatedMatchData: match,
                  })
                }
              >
                <Icon name="create-outline" size={16} color="#fff" />
                <Text style={styles.updateButtonText}> Update Match</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No match data found!</Text>
        )}
      </ScrollView>

      {/* Add Match Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("BallSelectionScreen")}
      >
        <Icon name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.addButtonText}> Add Live Match</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#BBBDB3",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#13808B",
  },
  card: {
    backgroundColor: "#13808B",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    fontSize: 14,
    color: "#03CAAA",
    marginLeft: 5,
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  team: {
    fontSize: 16,
    color: "#fff",
  },
  score: {
    fontSize: 16,
    color: "#FFD700",
  },
  note: {
    fontSize: 14,
    color: "#fff",
    marginVertical: 5,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7C000E",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7C000E",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginVertical: 20,
  },
});

export default LiveMatches;
