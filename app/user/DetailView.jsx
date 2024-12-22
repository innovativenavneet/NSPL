import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from "../tabs/HeaderUser";
import MatchHighlights from './Cards/MatchHighlights';
import { ScrollView } from 'react-native-gesture-handler';

export default function DetailView() {
 
  return (
    <>
    <Header/>
    <ScrollView>
    <View style={styles.container}>
   

   {/* Match Details */}
   <View style={styles.matchDetails}>
     <Text style={styles.title}>New Zealand vs England</Text>
     <Text style={styles.subtitle}>14 - 18 Dec - Starts at 3:30 AM</Text>
   </View>

   {/* Scores Section */}
   <View style={styles.scores}>
     <View style={styles.team}>
       <Image
         source={{ uri: 'https://flagcdn.com/w320/nz.png' }} // Replace with NZ flag
         style={styles.flag}
       />
       <Text style={styles.teamName}>New Zealand</Text>
       <Text style={styles.score}>315/9 (82)</Text>
       <Text style={styles.innings}>1st</Text>
     </View>
     <View style={styles.team}>
       <Image
         source={{ uri: 'https://flagcdn.com/w320/gb-eng.png' }} // Replace with ENG flag
         style={styles.flag}
       />
       <Text style={styles.teamName}>England</Text>
       <Text style={styles.innings}>Yet to bat</Text>
     </View>
   </View>

   {/* Status Section */}
   <View style={styles.status}>
     <Text style={styles.statusText}>ENG chose to bowl</Text>
     <Text style={styles.matchInfo}>Test 3 of 3 (ENG leads 2-0) - End of day 1</Text>
   </View>

   {/* Batting and Bowling Details */}
   <View style={styles.details}>
     <View style={styles.section}>
       <Text style={styles.sectionTitle}>NZ batting</Text>
       <Text style={styles.sectionText}>M. Santner: 50* (54)</Text>
       <Text style={styles.sectionText}>W. O'Rourke: 0* (2)</Text>
     </View>
     <View style={styles.section}>
       <Text style={styles.sectionTitle}>ENG bowling</Text>
       <Text style={styles.sectionText}>M. Potts: 3/75 (21.0)</Text>
       <Text style={styles.sectionText}>G. Atkinson: 3/55 (19.0)</Text>
     </View>
   </View>

   {/* Probability Section */}
   <View style={styles.probability}>
     <Text style={styles.probabilityText}>LIVE WIN PROBABILITY</Text>
     <View style={styles.probabilityBar}>
       <View style={[styles.probabilitySegment, { flex: 4, backgroundColor: '#4CAF50' }]} />
       <View style={[styles.probabilitySegment, { flex: 1, backgroundColor: '#FFC107' }]} />
       <View style={[styles.probabilitySegment, { flex: 5, backgroundColor: '#F44336' }]} />
     </View>
     <View style={styles.probabilityLabels}>
       <Text style={styles.probabilityLabel}>New Zealand</Text>
       <Text style={styles.probabilityLabel}>Draw</Text>
       <Text style={styles.probabilityLabel}>England</Text>
     </View>
   </View>
   <MatchHighlights/>
 </View>
    </ScrollView>



    </>
  
  );
};

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
    color: '#BBBBBB',
    fontSize: 14,
  },
  scores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  team: {
    alignItems: 'center',
  },
  flag: {
    width: 50,
    height: 30,
    marginBottom: 8,
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
    color: '#BBBBBB',
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
    color: '#BBBBBB',
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
    color: '#BBBBBB',
    fontSize: 14,
  },
  probability: {
    alignItems: 'center',
  },
  probabilityText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
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
});
