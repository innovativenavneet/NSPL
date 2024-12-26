import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [players, setPlayers] = useState([
    {
      name: "John Doe",
      role: "Batsman",
      keyStats: "800 Runs, 20 Wickets",
      status: "Active",
      born: "24 July, 1992 (32 Years)",
    },
    {
      name: "Jane Smith",
      role: "Bowler",
      keyStats: "150 Wickets, 100 Runs",
      status: "Active",
      born: "15 August, 1990 (33 Years)",
    },
    {
      name: "Michael Johnson",
      role: "All-rounder",
      keyStats: "500 Runs, 50 Wickets",
      status: "Inactive",
      born: "10 March, 1988 (35 Years)",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    role: "",
    keyStats: "",
    status: "",
    born: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
const filteredPlayers = players.filter((player) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      player.name.toLowerCase().includes(lowerCaseSearchText) ||
      player.role.toLowerCase().includes(lowerCaseSearchText) ||
      player.status.toLowerCase().includes(lowerCaseSearchText)
    );
  });
  

  const openModalForAdd = () => {
    setNewPlayer({
      name: "",
      role: "",
      keyStats: "",
      status: "",
      born: "",
    });
    setIsUpdating(false);
    setModalVisible(true);
  };

  const openModalForUpdate = (player, index) => {
    setNewPlayer(player);
    setIsUpdating(true);
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const addOrUpdatePlayer = () => {
    if (isUpdating) {
      // Update player details
      const updatedPlayers = [...players];
      updatedPlayers[currentIndex] = newPlayer;
      setPlayers(updatedPlayers);
    } else {
      // Add a new player
      setPlayers([...players, newPlayer]);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterSearchContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome5 name="filter" size={16} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <FontAwesome5
            name="search"
            size={16}
            color="#000"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity
          style={styles.addPlayerButton}
          onPress={openModalForAdd}
        >
          <Text style={styles.addPlayerText}>Add Player</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.playerCard}>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>Name: {item.name}</Text>
              <Text style={styles.playerRole}>Role: {item.role}</Text>
              <Text style={styles.playerStats}>Key Stats: {item.keyStats}</Text>
              <Text style={styles.playerStatus}>Status: {item.status}</Text>
              <Text style={styles.playerBorn}>Born: {item.born}</Text>
            </View>
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => openModalForUpdate(item, index)}
            >
              <Text style={styles.viewMoreText}>Update Info</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isUpdating ? "Update Player Info" : "Add New Player"}
            </Text>
            <TextInput
              placeholder="Name"
              value={newPlayer.name}
              onChangeText={(text) => setNewPlayer({ ...newPlayer, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Role"
              value={newPlayer.role}
              onChangeText={(text) =>
                setNewPlayer({ ...newPlayer, role: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Key Stats"
              value={newPlayer.keyStats}
              onChangeText={(text) =>
                setNewPlayer({ ...newPlayer, keyStats: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Status"
              value={newPlayer.status}
              onChangeText={(text) =>
                setNewPlayer({ ...newPlayer, status: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Born"
              value={newPlayer.born}
              onChangeText={(text) =>
                setNewPlayer({ ...newPlayer, born: text })
              }
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isUpdating ? "Update Player" : "Add Player"}
                onPress={addOrUpdatePlayer}
              />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#7C000E"
              />
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
    backgroundColor: "#BBBDB3",
    padding: 16,
  },
  filterSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: "#13808B",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#13808B",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  addPlayerButton: {
    backgroundColor: "#7C000E",
    padding: 10,
    borderRadius: 8,
  },
  addPlayerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  playerCard: {
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
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  playerRole: {
    fontSize: 14,
    color: "white",
  },
  playerStats: {
    fontSize: 14,
    color: "white",
  },
  playerStatus: {
    fontSize: 14,
    color: "green",
  },
  playerBorn: {
    fontSize: 12,
    color: "white",
  },
  viewMoreButton: {
    backgroundColor: "#7C000E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewMoreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#BBBDB3",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#13808B",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "13808B"
  },
});

export default App;
