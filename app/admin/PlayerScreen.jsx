import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const PlayerCard = ({ name, role, keyStats, status, born }) => (
  <View style={styles.playerCard}>
    <View style={styles.playerInfo}>
      <Text style={styles.playerName}>Name: {name}</Text>
      <Text style={styles.playerRole}>Role: {role}</Text>
      <Text style={styles.playerStats}>Key Stats: {keyStats}</Text>
      <Text style={styles.playerStatus}>Status: {status}</Text>
      <Text style={styles.playerBorn}>Born: {born}</Text>
    </View>
    <TouchableOpacity style={styles.viewMoreButton}>
      <Text style={styles.viewMoreText}>Update info</Text>
    </TouchableOpacity>
  </View>
);

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [players, setPlayers] = useState([
    { name: 'John Doe', role: 'Batsman', keyStats: '800 Runs, 20 Wickets', status: 'Active', born: '24 July, 1992 (32 Years)' },
    { name: 'Jane Smith', role: 'Bowler', keyStats: '150 Wickets, 100 Runs', status: 'Active', born: '15 August, 1990 (33 Years)' },
    { name: 'Michael Johnson', role: 'All-rounder', keyStats: '500 Runs, 50 Wickets', status: 'Inactive', born: '10 March, 1988 (35 Years)' },
  ]);

  const filteredPlayers = players.filter(player =>
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
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            role={item.role}
            keyStats={item.keyStats}
            status={item.status}
            born={item.born}
          />
        )}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#13808B',
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  playerRole: {
    fontSize: 14,
    color: 'white',
  },
  playerStats: {
    fontSize: 14,
    color: 'white',
  },
  playerStatus: {
    fontSize: 14,
    color: 'green',
  },
  playerBorn: {
    fontSize: 12,
    color: 'white',
  },
  viewMoreButton: {
    backgroundColor: '#7C000E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default App;
