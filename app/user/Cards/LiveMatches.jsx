import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';  // Importing icons from Expo

const LiveMatches = ({ matchType, ballType }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMatches = () => {
      const matchesRef = collection(db, 'matches');

      // Construct Firestore query with matchType and ballType filters
      const q = query(
        matchesRef,
        where('matchType', '==', matchType),
        where('ballType', '==', ballType)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedMatches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMatches(fetchedMatches);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching matches:', error);
          setLoading(false);
        }
      );

      return () => unsubscribe(); // Cleanup on component unmount
    };

    fetchMatches();
  }, [matchType, ballType]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#13808B" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../../assets/startingflow/CricketBall.png')}
          style={styles.logo}
        />
        <Text style={styles.header}>Live Matches</Text>
      </View>

      <ScrollView>
        {matches.length > 0 ? (
          matches.map((match) => (
            <View key={match.id} style={styles.card}>
              <View style={styles.teamsContainer}>
                <Text style={styles.title}>{match.matchName || 'Match Name Unavailable'}</Text>
                <Text style={styles.status}>
                  <MaterialIcons name="sports-cricket" size={20} color="#03CAAA" /> 
                  {match.status}
                </Text>
              </View>
              <View style={styles.teamsContainer}>
                <Text style={styles.team}>{match.battingTeam}</Text>
                <Text style={styles.score}>
                  {match.score?.runs || 0}/{match.score?.wickets || 0}
                </Text>
              </View>
              <View style={styles.teamsContainer}>
                <Text style={styles.team}>{match.bowlingTeam}</Text>
                <Text style={styles.score}>{match.score?.overs || '0.0'} overs</Text>
              </View>
              <Text style={styles.note}>{match.note || 'Additional Information'}</Text>
              <Text style={styles.championship}>{match.championship}</Text>

              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => navigation.navigate('DetailView', { matchId: match.id })}
              >
                <MaterialIcons name="info" size={20} color="white" />
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No live matches found for the selected filters!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    backgroundColor: '#13808B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
  status: {
    fontSize: 14,
    color: '#03CAAA',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  team: {
    fontSize: 16,
    color: '#fff',
  },
  score: {
    fontSize: 18,
    color: '#7C000E',
  },
  note: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 5,
  },
  championship: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 10,
    marginTop: 5,
  },
  viewDetailsButton: {
    backgroundColor: '#7C000E',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7C000E',
  },
});

export default LiveMatches;
