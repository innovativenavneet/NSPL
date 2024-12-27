import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"; // Importing vector icons
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);

  // Fetch matches from Firestore
  const fetchMatches = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "upcomingMatches"));
      const fetchedMatches = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMatches(fetchedMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <FontAwesome5 name="cricket" size={24} color="#FFD700" style={styles.logo} />
        <Text style={styles.header}>Upcoming Matches</Text>
      </View>

      {/* List of Matches */}
      <ScrollView>
        {matches.map((match) => (
          <View key={match.id} style={styles.card}>
            <View style={styles.matchHeader}>
              <Text style={styles.title}>
                <FontAwesome5 name="trophy" size={16} color="#FFD700" /> {match.match}
              </Text>
              <Text style={styles.day}>
                <MaterialIcons name="today" size={16} color="#03CAAA" /> {match.day}
              </Text>
            </View>
            <Text style={styles.details}>
              <MaterialIcons name="sports" size={16} color="#fff" /> {match.team1} vs{" "}
              {match.team2}
            </Text>
            <Text style={styles.details}>
              <MaterialIcons name="schedule" size={16} color="#fff" /> {match.time}
            </Text>
            <Text style={styles.details}>
              <FontAwesome5 name="medal" size={16} color="#fff" /> {match.championship}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#BBBDB3",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    backgroundColor: "#13808B",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  day: {
    fontSize: 14,
    color: "#03CAAA",
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
});

export default UpcomingMatches;
