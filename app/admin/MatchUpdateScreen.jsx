import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

const MatchUpdateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { matchId, updatedMatchData } = route.params || {};

  // Initialize state with existing data or defaults
  const [battingTeam, setBattingTeam] = useState(updatedMatchData?.battingTeam || "");
  const [bowlingTeam, setBowlingTeam] = useState(updatedMatchData?.bowlingTeam || "");
  const [runs, setRuns] = useState(String(updatedMatchData?.score?.runs || ""));
  const [wickets, setWickets] = useState(String(updatedMatchData?.score?.wickets || ""));
  const [overs, setOvers] = useState(updatedMatchData?.score?.overs || "");
  const [player1, setPlayer1] = useState(updatedMatchData?.players?.[0]?.name || "");
  const [player1Runs, setPlayer1Runs] = useState(String(updatedMatchData?.players?.[0]?.batting?.runs || ""));
  const [player1Balls, setPlayer1Balls] = useState(String(updatedMatchData?.players?.[0]?.batting?.balls || ""));
  const [player1FoursAndSixes, setPlayer1FoursAndSixes] = useState(updatedMatchData?.players?.[0]?.batting?.foursAndSixes || "");
  const [player2, setPlayer2] = useState(updatedMatchData?.players?.[1]?.name || "");
  const [player2Runs, setPlayer2Runs] = useState(String(updatedMatchData?.players?.[1]?.batting?.runs || ""));
  const [player2Balls, setPlayer2Balls] = useState(String(updatedMatchData?.players?.[1]?.batting?.balls || ""));
  const [player2FoursAndSixes, setPlayer2FoursAndSixes] = useState(updatedMatchData?.players?.[1]?.batting?.foursAndSixes || "");
  const [player2Overs, setPlayer2Overs] = useState(updatedMatchData?.players?.[1]?.bowling?.overs || "");
  const [player2RunsGiven, setPlayer2RunsGiven] = useState(String(updatedMatchData?.players?.[1]?.bowling?.runsGiven || ""));
  const [player2Wickets, setPlayer2Wickets] = useState(String(updatedMatchData?.players?.[1]?.bowling?.wickets || ""));

  const handleUpdate = async () => {
    const updatedMatch = {
      battingTeam,
      bowlingTeam,
      score: {
        runs: parseInt(runs),
        wickets: parseInt(wickets),
        overs,
      },
      players: [
        {
          name: player1,
          batting: {
            runs: parseInt(player1Runs),
            balls: parseInt(player1Balls),
            foursAndSixes: player1FoursAndSixes,
          },
        },
        {
          name: player2,
          batting: {
            runs: parseInt(player2Runs),
            balls: parseInt(player2Balls),
            foursAndSixes: player2FoursAndSixes,
          },
          bowling: {
            overs: player2Overs,
            runsGiven: parseInt(player2RunsGiven),
            wickets: parseInt(player2Wickets),
          },
        },
      ],
    };

    try {
      const matchDocRef = doc(db, 'matches', matchId);
      await updateDoc(matchDocRef, updatedMatch);
      alert('Match updated successfully!');
      navigation.navigate("AdminFooter", { matchId, updatedMatchData });
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Match Update</Text>

      {/* Teams and Score Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Teams and Score</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Batting Team"
          placeholderTextColor="#555"
          value={battingTeam}
          onChangeText={setBattingTeam}
        />
        <TextInput
          style={styles.input}
          placeholder="Current Bowling Team"
          placeholderTextColor="#555"
          value={bowlingTeam}
          onChangeText={setBowlingTeam}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Runs"
            placeholderTextColor="#555"
            value={runs}
            onChangeText={setRuns}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Wickets"
            placeholderTextColor="#555"
            value={wickets}
            onChangeText={setWickets}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Overs"
            placeholderTextColor="#555"
            value={overs}
            onChangeText={setOvers}
          />
        </View>
      </View>

      {/* Player 1 Batting Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Player 1 Batting</Text>
        <TextInput
          style={styles.input}
          placeholder="Player Name"
          placeholderTextColor="#555"
          value={player1}
          onChangeText={setPlayer1}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Runs"
            placeholderTextColor="#555"
            value={player1Runs}
            onChangeText={setPlayer1Runs}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Balls"
            placeholderTextColor="#555"
            value={player1Balls}
            onChangeText={setPlayer1Balls}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="4s & 6s"
            placeholderTextColor="#555"
            value={player1FoursAndSixes}
            onChangeText={setPlayer1FoursAndSixes}
          />
        </View>
      </View>

      {/* Player 2 Batting and Bowling Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Player 2 Batting</Text>
        <TextInput
          style={styles.input}
          placeholder="Player Name"
          placeholderTextColor="#555"
          value={player2}
          onChangeText={setPlayer2}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Runs"
            placeholderTextColor="#555"
            value={player2Runs}
            onChangeText={setPlayer2Runs}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Balls"
            placeholderTextColor="#555"
            value={player2Balls}
            onChangeText={setPlayer2Balls}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="4s & 6s"
            placeholderTextColor="#555"
            value={player2FoursAndSixes}
            onChangeText={setPlayer2FoursAndSixes}
          />
        </View>
        <Text style={styles.sectionTitle}>Player 2 Bowling</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Overs"
            placeholderTextColor="#555"
            value={player2Overs}
            onChangeText={setPlayer2Overs}
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Runs Given"
            placeholderTextColor="#555"
            value={player2RunsGiven}
            onChangeText={setPlayer2RunsGiven}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="Wickets"
            placeholderTextColor="#555"
            value={player2Wickets}
            onChangeText={setPlayer2Wickets}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
