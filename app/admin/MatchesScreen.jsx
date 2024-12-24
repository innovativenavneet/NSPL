import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';

const AddMatchScreen = () => {
  const navigation = useNavigation();
  const [matchDetails, setMatchDetails] = useState({
    match: '',
    day: '',
    team1: '',
    team2: '',
    time: '',
    championship: '',
  });

  const handleInputChange = (field, value) => {
    setMatchDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const handleAddMatch = () => {
    // Add functionality to send matchDetails to the backend or update the state in `UpcomingMatches`
    console.log('Match Details:', matchDetails);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Match</Text>

      <TextInput
        style={styles.input}
        placeholder="Match Title"
        placeholderTextColor="#555"
        value={matchDetails.match}
        onChangeText={(value) => handleInputChange('match', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Day (e.g., Today, Tomorrow)"
        placeholderTextColor="#555"
        value={matchDetails.day}
        onChangeText={(value) => handleInputChange('day', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 1"
        placeholderTextColor="#555"
        value={matchDetails.team1}
        onChangeText={(value) => handleInputChange('team1', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 2"
        placeholderTextColor="#555"
        value={matchDetails.team2}
        onChangeText={(value) => handleInputChange('team2', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (e.g., Starts at 3:00 PM)"
        placeholderTextColor="#555"
        value={matchDetails.time}
        onChangeText={(value) => handleInputChange('time', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Championship Name"
        placeholderTextColor="#555"
        value={matchDetails.championship}
        onChangeText={(value) => handleInputChange('championship', value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddMatch}>
        <Text style={styles.buttonText}>Add Match</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006D75',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    elevation: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 45,
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006D75',
  },
});

export default AddMatchScreen;
