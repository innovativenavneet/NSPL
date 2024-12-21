import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const UpcomingMatches = () => {
  const [data, setData] = useState([
    {
      match: "Gulf T20I Championship - T20 4 of 16",
      day: "Today",
      team1: "Qatar",
      team2: "Oman",
      time: "Starts at 3:00 PM",
      championship: "Men's T20I Championship"
    },
    {
      match: "T20 1 of 3",
      day: "Tomorrow",
      team1: "India Women",
      team2: "West Indies Women",
      time: "Starts at 7:00 PM",
      championship: "Women's T20I Championship"
    }
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../../assets/startingflow/CricketBall.png')}
          style={styles.logo}
        />
        <Text style={styles.header}>Upcoming Matches</Text>
      </View>

      {data.map((match, index) => (
        <View key={index} style={styles.card}>
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
      ))}
    <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontFamily: 'OpenSansBold',
    color: '#000',
  },
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
  viewDetailsButton: {
    backgroundColor: '#7C000E',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'OpenSansBold',
  },
});

export default UpcomingMatches;
