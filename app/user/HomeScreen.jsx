import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import Header from "../tabs/HeaderUser";
import LiveMatches from './Cards/LiveMatches';
import MatchHighlights from './Cards/MatchHighlights';
import UpcomingMatches from './Cards/UpcomingMatches/UpcomingMatches';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen({ route }) {
  const {  matchType, ballType,  } = route.params || {}; 

  const data = [
    { key: '1', component: <LiveMatches  matchType={matchType} ballType={ballType}/> },
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

});
