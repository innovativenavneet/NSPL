import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import Header from "../tabs/HeaderAdmin";
import CurrentMatches from './Cards/CurrentMatches';
import UpcomingMatches from './Cards/UpcomingMatches/UpcomingMatches';
import { ScrollView } from 'react-native-gesture-handler';
import MatchHighlights from './Cards/MatchHighlights';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen({ route }) {
  const { matchId, matchType, ballType, updatedMatchData } = route.params || {}; // Get matchId from route params

  const data = [
    { key: '1', component: <CurrentMatches matchId={matchId} matchType={matchType} ballType={ballType} updatedMatchData={updatedMatchData}/> }, // Pass each prop individually
    { key: '2', component: <UpcomingMatches /> },
    { key: '3', component: <MatchHighlights /> },

  ];

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      {item.component}
    </View>
  );

  return (
   
   <View style={styles.container}>
      <Header />
      <View>
        <Text style={styles.title}>Welcome Back Admin!</Text>
      </View>
   
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
      />
    </View>
   
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBBDB3',
  },
  listContainer: {
    paddingBottom: 10, 
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    marginHorizontal: 50,
    marginVertical: 20,
  }
});