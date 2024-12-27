import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';

const PlayerCard = ({ name, runs, ballsFaced, strikeRate, status, photo }) => (
  <View style={styles.playerCard}>
    <View style={styles.playerInfo}>
      {/* Player Photo on the Left */}
      <View style={styles.photoContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.profilePhoto} />
        ) : (
          <FontAwesome5 name="user-circle" size={50} color="#ccc" />
        )}
      </View>

      {/* Player Details on the Right */}
      <View style={styles.detailsContainer}>
        <Text style={styles.playerName}>{name}</Text>
        <Text style={styles.playerStat}>Runs: {runs}</Text>
        <Text style={styles.playerStat}>Balls Faced: {ballsFaced}</Text>
        <Text style={styles.playerStat}>Strike Rate: {strikeRate}</Text>
        <Text style={styles.playerStatus}>Status: {status}</Text>
      </View>
    </View>
  </View>
);

const PlayerListing = () => {
  const [players, setPlayers] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Fetch players from Firestore
  const fetchPlayers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'players'));
      const fetchedPlayers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(fetchedPlayers);
      console.log('Player Details:', fetchedPlayers); // Debugging
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Filter players by search text
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterSearchContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome5 name="filter" size={16} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color="#000" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView>
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            name={player.name}
            runs={player.runs}
            ballsFaced={player.ballsFaced}
            strikeRate={player.strikeRate}
            status={player.status}
            photo={player.photo} // Pass the photo URL here
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBBDB3',
    padding: 16,
  },
  filterSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#13808B',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13808B',
    borderWidth: 1,
    borderColor: '#ccc',
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
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13808B',
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  photoContainer: {
    marginRight: 15,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20
  },
  playerName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#7C000E',
  },
  playerStat: {
    fontSize: 14,
    color: '#FFF',
  },
  playerStatus: {
    fontSize: 14,
    color: 'green',
  },
});

export default PlayerListing;
