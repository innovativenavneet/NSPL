import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"; // Importing vector icons
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMatch, setNewMatch] = useState({
    match: "",
    day: "",
    team1: "",
    team2: "",
    time: "",
    championship: "",
  });

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

  // Add a new match to Firestore
  const handleAddMatch = async () => {
    if (
      !newMatch.match ||
      !newMatch.day ||
      !newMatch.team1 ||
      !newMatch.team2 ||
      !newMatch.time ||
      !newMatch.championship
    ) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "upcomingMatches"), newMatch);
      Alert.alert("Success", "Match added successfully!");
      setModalVisible(false);
      setNewMatch({
        match: "",
        day: "",
        team1: "",
        team2: "",
        time: "",
        championship: "",
      });
      fetchMatches(); // Refresh the match list
    } catch (error) {
      console.error("Error adding match:", error);
    }
  };

  // Delete match from Firestore
  const handleDeleteMatch = async (id) => {
    try {
      await deleteDoc(doc(db, "upcomingMatches", id));
      Alert.alert("Success", "Match deleted successfully!");
      fetchMatches(); // Refresh the match list
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  };

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
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteMatch(match.id)}
            >
              <MaterialIcons name="delete" size={20} color="#fff" />
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Add Match Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Match</Text>
      </TouchableOpacity>

      {/* Modal for Adding a Match */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add New Match</Text>

            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Match Title"
                value={newMatch.match}
                onChangeText={(text) => setNewMatch({ ...newMatch, match: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Day (e.g., Today, Tomorrow)"
                value={newMatch.day}
                onChangeText={(text) => setNewMatch({ ...newMatch, day: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Team 1"
                value={newMatch.team1}
                onChangeText={(text) => setNewMatch({ ...newMatch, team1: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Team 2"
                value={newMatch.team2}
                onChangeText={(text) => setNewMatch({ ...newMatch, team2: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Time (e.g., Starts at 3:00 PM)"
                value={newMatch.time}
                onChangeText={(text) => setNewMatch({ ...newMatch, time: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Championship"
                value={newMatch.championship}
                onChangeText={(text) =>
                  setNewMatch({ ...newMatch, championship: text })
                }
              />
            </ScrollView>

            {/* Modal Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddMatch}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Existing styles
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#7C000E',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
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
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#7C000E',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,

  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#13808B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UpcomingMatches;
