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
  Image,
} from "react-native";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../firebaseConfig"; // Update the import based on your project structure
import { FontAwesome5 } from "@expo/vector-icons";

const PlayerManagement = () => {
  const [players, setPlayers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    runs: "",
    ballsFaced: "",
    strikeRate: "",
    photo: null,
    status: "Yet To Bat", // Default status
  });

  // Fetch players from Firestore
  const fetchPlayers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "players"));
      const fetchedPlayers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(fetchedPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Add a new player to Firestore
  const handleAddPlayer = async () => {
    const { name, runs, ballsFaced, strikeRate, photo, status } = newPlayer;

    if (!name || runs === "" || ballsFaced === "" || strikeRate === "") {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "players"), {
        name,
        runs: parseInt(runs),
        ballsFaced: parseInt(ballsFaced),
        strikeRate: parseFloat(strikeRate),
        photo,
        status,
      });
      Alert.alert("Success", "Player added successfully!");
      setModalVisible(false);
      setNewPlayer({
        name: "",
        runs: "",
        ballsFaced: "",
        strikeRate: "",
        photo: null,
        status: "Yet To Bat",
      });
      fetchPlayers();
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  // Delete player from Firestore
  const handleDeletePlayer = async (id) => {
    try {
      await deleteDoc(doc(db, "players", id));
      Alert.alert("Success", "Player deleted successfully!");
      fetchPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  // Pick a photo for the player
  const pickPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setNewPlayer({ ...newPlayer, photo: result.uri });
    }
  };

  // Filter players by search text
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Player Management</Text>

      {/* Search and Filter Section */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome5 name="filter" size={20} color="#13808B" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search players"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView>
        {filteredPlayers.map((player) => (
          <View key={player.id} style={styles.card}>
            <View style={styles.cardContent}>
              {/* Profile Photo or Placeholder */}
              {player.photo ? (
                <Image source={{ uri: player.photo }} style={styles.profilePhoto} />
              ) : (
                <FontAwesome5 name="user-circle" size={50} color="#ccc" />
              )}

              {/* Player Details */}
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>{player.name}</Text>
                <Text style={styles.detail}>Runs: {player.runs}</Text>
                <Text style={styles.detail}>Balls Faced: {player.ballsFaced}</Text>
                <Text style={styles.detail}>Strike Rate: {player.strikeRate}</Text>
                <Text style={styles.detail}>Status: {player.status}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePlayer(player.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Player</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add New Player</Text>

            <TextInput
              style={styles.input}
              placeholder="Player Name"
              value={newPlayer.name}
              onChangeText={(text) => setNewPlayer({ ...newPlayer, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Runs Scored"
              value={newPlayer.runs}
              onChangeText={(text) => setNewPlayer({ ...newPlayer, runs: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Balls Faced"
              value={newPlayer.ballsFaced}
              onChangeText={(text) =>
                setNewPlayer({ ...newPlayer, ballsFaced: text })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Strike Rate"
              value={newPlayer.strikeRate}
              onChangeText={(text) =>
                setNewPlayer({ ...newPlayer, strikeRate: text })
              }
              keyboardType="numeric"
            />

            {/* Add Photo Button */}
            <TouchableOpacity style={styles.photoButton} onPress={pickPhoto}>
              <Text style={styles.photoButtonText}>
                {newPlayer.photo ? "Change Photo" : "Add Photo"}
              </Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddPlayer}>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#BBBDB3',
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#BBBDB3",
    borderRadius: 10,
    padding: 10,
    elevation: 10,
  },
  filterButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
    borderColor: "#CCC",
    borderWidth: 5,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#13808B",
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    marginLeft: 20,

  },
  detail: {
    fontSize: 14,
    color: "white",
    marginLeft: 20,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#7C000E",
    padding: 10,
    borderRadius: 5,
    marginLeft: -60,
    // alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#13808B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#BBBDB3",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  photoButton: {
    backgroundColor: "#13808B",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  photoButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

  },
  cancelButton: {
    backgroundColor: "#7C000E",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#13808B",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default PlayerManagement;
