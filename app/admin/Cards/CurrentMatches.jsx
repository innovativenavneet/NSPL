import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const LiveMatches = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { matchId, updatedMatchData } = route.params || {};

  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMatchData = async () => {
    setLoading(true);
    if (matchId) {
      const matchDocRef = doc(db, 'matches', matchId);
      try {
        const docSnapshot = await getDoc(matchDocRef);
        if (docSnapshot.exists()) {
          setMatchData(docSnapshot.data());
        } else {
          console.log('No such match exists!');
        }
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    }
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Re-fetch match data when screen comes into focus
      if (matchId) {
        fetchMatchData();
      } else if (updatedMatchData) {
        setMatchData(updatedMatchData);
        setLoading(false);
      }
    }, [matchId, updatedMatchData])
  );

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
        <Text style={styles.header}>Current Matches</Text>
      </View>

      {matchData ? (
        <View style={styles.card}>
          <View style={styles.teamsContainer}>
            <Text style={styles.title}>{matchData.matchName || 'Match Name Unavailable'}</Text>
            <View style={styles.statusContainer}>
              <Icon name="radio-button-on" size={14} color="#03CAAA" />
              <Text style={styles.status}>{matchData.status || 'Unknown Status'}</Text>
            </View>
          </View>
          <View style={styles.teamsContainer}>
            <Icon name="shirt" size={18} color="#fff" />
            <Text style={styles.team}>{matchData.battingTeam || 'Batting Team'}</Text>
            <Text style={styles.score}>
              {matchData.score?.runs || 0}/{matchData.score?.wickets || 0}
            </Text>
          </View>
          <View style={styles.teamsContainer}>
            <Icon name="shield" size={18} color="#fff" />
            <Text style={styles.team}>{matchData.bowlingTeam || 'Bowling Team'}</Text>
            <Text style={styles.score}>
              {matchData.score?.overs || '0.0'} overs
            </Text>
          </View>
          <Text style={styles.note}>
            <Icon name="information-circle" size={16} color="#fff" />{' '}
            {matchData.note || 'Additional Information'}
          </Text>
        </View>
      ) : (
        <Text style={styles.noData}>No match data found!</Text>
      )}

      {matchData ? (
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('MatchUpdateScreen', { matchId, updatedMatchData: matchData })}
        >
          <Icon name="create" size={16} color="#fff" />
          <Text style={styles.updateButtonText}> Update Match</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('MatchAddScreen')}
        >
          <Icon name="add-circle" size={16} color="#fff" />
          <Text style={styles.updateButtonText}> Add Match</Text>
        </TouchableOpacity>
      )}
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
    fontFamily: 'OpenSansBold',
    color: '#000',
    fontWeight: "bold",

  },
  card: {
    backgroundColor: '#13808B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'OpenSans',
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -200,
  },
  status: {
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    color: '#03CAAA',
    marginLeft: 5,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  team: {
    fontSize: 16,
    fontFamily: 'OpenSansBold',
    color: '#fff',
    marginRight: 200,
  },
  score: {
    fontSize: 18,
    fontFamily: 'OpenSansBold',
    color: '#7C000E',
  },
  note: {
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    color: '#fff',
    marginVertical: 5,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7C000E',
  },
  updateButton: {
    flexDirection: 'row',
    backgroundColor: '#7C000E',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    marginLeft: 5,
  },
});

export default LiveMatches;
