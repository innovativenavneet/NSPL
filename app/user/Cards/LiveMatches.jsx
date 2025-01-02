import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";

const LiveMatches = ({ matchType, ballType }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMatches = () => {
      const matchesRef = collection(db, "matches");

      // Query with filters for matchType and ballType
      const q = query(
        matchesRef,
        where("matchType", "==", matchType),
        where("ballType", "==", ballType)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedMatches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMatches(fetchedMatches);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching matches:", error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    };

    fetchMatches();
  }, [matchType, ballType]);

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
        <Text style={styles.header}>Live Matches</Text>
      </View>

      <ScrollView>
        {matches.length > 0 ? (
          matches.map((match) => (
            <View key={match.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>
                  {match.matchName || "Match Name Unavailable"}
                </Text>
                <Text style={styles.status}>
                  <MaterialIcons name="sports-cricket" size={14} color="#03CAAA" />{" "}
                  {match.status || "Live"}
                </Text>
              </View>
              <View style={styles.teamsContainer}>
                <Text style={styles.team}>{match.battingTeam || "Team A"}</Text>
                <Text style={styles.score}>
                  {match.score?.runs || 0}/{match.score?.wickets || 0}
                </Text>
              </View>
              <View style={styles.teamsContainer}>
                <Text style={styles.team}>{match.bowlingTeam || "Team B"}</Text>
                <Text style={styles.score}>
                  {match.score?.overs || "0.0"} overs
                </Text>
              </View>
              <Text style={styles.note}>
                {match.note || "Additional Information"}
              </Text>
              <Text style={styles.championship}>
                {match.championship || "Championship Name"}
              </Text>

              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => navigation.navigate("DetailView", { matchId: match.id })}
              >
                <MaterialIcons name="info" size={16} color="#fff" />
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>
            No live matches found for the selected filters!
          </Text>
        )}
      </ScrollView>
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
  championship: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 10,
  },
  viewDetailsButton: {
    backgroundColor: "#7C000E",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  viewDetailsText: {
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
