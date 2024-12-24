import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MatchCard = ({ match }) => {
  return (
    <View style={styles.card}>
      <View style={styles.match}>
        <View style={styles.teamsContainer}>
          <Text style={styles.title}>{match.match}</Text>
          <Text style={styles.day}>{match.day}</Text>
        </View>
        <Text style={styles.team}>{match.team1}</Text>
        <Text style={styles.team}>{match.team2}</Text>
        <View style={styles.teamsContainer}>
          <Text style={styles.time}>{match.time}</Text>
          <Text style={styles.championship}>{match.championship}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#13808B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  match: {
    marginBottom: 10,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: 'OpenSans',
    color: '#fff',
  },
  day: {
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    color: '#03CAAA',
  },
  team: {
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    color: '#fff',
  },
  time: {
    fontSize: 14,
    fontFamily: 'OpenSans',
    color: '#fff',
  },
  championship: {
    fontSize: 14,
    fontFamily: 'OpenSans',
    color: '#fff',
  },
});

export default MatchCard;
