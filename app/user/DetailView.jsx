import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Header from '../tabs/HeaderUser';
import MatchHighlights from './Cards/MatchHighlights';

export default function DetailView({ route }) {
  const { matchId } = route.params || {};
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const matchDoc = await getDoc(doc(db, 'matches', matchId));
        if (matchDoc.exists()) {
          setMatchData(matchDoc.data());
        } else {
          console.error('Match not found');
        }
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    if (matchId) fetchMatchData();
  }, [matchId]);

  if (!matchData) {
    return (
      <View style={styles.loader}>
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  const { battingTeam, bowlingTeam, score, players } = matchData;

  return (
    <>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          {/* Match Details */}
          <View style={styles.matchDetails}>
            <Text style={styles.title}>
              {battingTeam} vs {bowlingTeam}
            </Text>
            <Text style={styles.subtitle}>Match in Progress</Text>
          </View>

          {/* Scores Section */}
          <View style={styles.scores}>
            <View style={styles.team}>
              <Text style={styles.teamName}>{battingTeam}</Text>
              <Text style={styles.score}>
                {score.runs}/{score.wickets} ({score.overs})
              </Text>
              <Text style={styles.innings}>1st Innings</Text>
            </View>
            <View style={styles.team}>
              <Text style={styles.teamName}>{bowlingTeam}</Text>
              <Text style={styles.innings}>Yet to bat</Text>
            </View>
          </View>

          {/* Status Section */}
          <View style={styles.status}>
            <Text style={styles.statusText}>Match in Progress</Text>
            <Text style={styles.matchInfo}>Test Series</Text>
          </View>

          {/* Batting and Bowling Details */}
          <View style={styles.details}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{battingTeam} Batting</Text>
              <Text style={styles.sectionText}>
                {players[0]?.name}: {players[0]?.batting?.runs}* (
                {players[0]?.batting?.balls})
              </Text>
              <Text style={styles.sectionText}>
                {players[1]?.name}: {players[1]?.batting?.runs}* (
                {players[1]?.batting?.balls})
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{bowlingTeam} Bowling</Text>
              <Text style={styles.sectionText}>
                {players[1]?.name}: {players[1]?.bowling?.overs} overs,{' '}
                {players[1]?.bowling?.runsGiven} runs,{' '}
                {players[1]?.bowling?.wickets} wickets
              </Text>
            </View>
          </View>

          {/* Probability Section */}
          <View style={styles.probability}>
            <Text style={styles.probabilityText}>LIVE WIN PROBABILITY</Text>
            <View style={styles.probabilityBar}>
              <View
                style={[
                  styles.probabilitySegment,
                  { flex: 4, backgroundColor: '#4CAF50' },
                ]}
              />
              <View
                style={[
                  styles.probabilitySegment,
                  { flex: 1, backgroundColor: '#FFC107' },
                ]}
              />
              <View
                style={[
                  styles.probabilitySegment,
                  { flex: 5, backgroundColor: '#F44336' },
                ]}
              />
            </View>
            <View style={styles.probabilityLabels}>
              <Text style={styles.probabilityLabel}>{battingTeam}</Text>
              <Text style={styles.probabilityLabel}>Draw</Text>
              <Text style={styles.probabilityLabel}>{bowlingTeam}</Text>
            </View>
          </View>
          <MatchHighlights />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 16,
  },
  matchDetails: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'black',
    fontSize: 15,
  },
  scores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  team: {
    alignItems: 'center',
  },
  teamName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  innings: {
    color: 'black',
    fontSize: 14,
  },
  status: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchInfo: {
    color: 'black',
    fontSize: 14,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionText: {
    color: 'black',
    fontSize: 14,
  },
  probability: {
    alignItems: 'center',
  },
  probabilityText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  probabilityBar: {
    flexDirection: 'row',
    height: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  probabilitySegment: {
    height: '100%',
  },
  probabilityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  probabilityLabel: {
    color: '#BBBBBB',
    fontSize: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
