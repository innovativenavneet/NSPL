import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "expo-router";

const MatchUpdateScreen = () => {
    const navigation= useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Match Update</Text>

      {/* Teams and Score Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Teams and Score</Text>
        <TextInput style={styles.input} placeholder="Current Batting Team" placeholderTextColor="#555" />
        <TextInput style={styles.input} placeholder="Current Bowling Team" placeholderTextColor="#555" />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Runs" placeholderTextColor="#555" />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Wickets" placeholderTextColor="#555" />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Overs" placeholderTextColor="#555" />
        </View>
      </View>

      {/* Player 1 Batting Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Player 1 Batting</Text>
        <TextInput style={styles.input} placeholder="Player Name" placeholderTextColor="#555" />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Runs" placeholderTextColor="#555" />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Balls" placeholderTextColor="#555" />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="4s & 6s" placeholderTextColor="#555" />
        </View>
      </View>

      {/* Player 2 Batting and Bowling Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Player 2 Batting</Text>
        <TextInput style={styles.input} placeholder="Player Name" placeholderTextColor="#555" />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Runs" placeholderTextColor="#555" />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Balls" placeholderTextColor="#555" />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="4s & 6s" placeholderTextColor="#555" />
        </View>
        <Text style={styles.sectionTitle}>Player 2 Bowling</Text>
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Overs" placeholderTextColor="#555" />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Runs Given" placeholderTextColor="#555" />
          <TextInput style={[styles.input, styles.smallInput]} placeholder="Wickets" placeholderTextColor="#555" />
        </View>
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.button}
       onPress={() => navigation.navigate('PlayerScoreScreens')}
      >
        <Text style={styles.buttonText}>Update</Text>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    elevation: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    flex: 1,
    marginRight: 10,
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

export default MatchUpdateScreen;
