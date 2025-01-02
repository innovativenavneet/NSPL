import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from "../tabs/HeaderUser"; 
import UpcomingMatches from './Cards/UpcomingMatches/UpcomingMatches';
export default function MatchesScreen() {
  return (
    <View style={styles.container}>
      <Header /> 
      <UpcomingMatches/>
    </View>
  );
}

// Adjusted styles for the HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    backgroundColor: '#BBBDB3', 
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 20, 
  },
});
