// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
// import * as Font from 'expo-font';

// const LiveMatches = () => {
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [data, setData] = useState({
//     match: "Test 3 of 3 (ENG leads 2-0) - Ends of day 1",
//     status: "Live",
//     team1: "New Zealand",
//     score1: "315/9 (82)",
//     team2: "England",
//     score2: "Yet to bat",
//     note: "ENG chose to bowl",
//     championship: "T20 Men's Championship",
//   });

//   useEffect(() => {
//     const loadFonts = async () => {
//       await Font.loadAsync({
//         OpenSans: require('../../../assets/fonts/OpenSans-Regular.ttf'),
//         OpenSansBold: require('../../../assets/fonts/OpenSans-Bold.ttf'),
//       });
//       setFontsLoaded(true);
//     };

//     loadFonts();
//   }, []);

//   // Show a loading spinner while fonts are loading
//   if (!fontsLoaded) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#13808B" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Image
//           source={require('../../../assets/startingflow/CricketBall.png')}
//           style={styles.logo}
//         />
//         <Text style={styles.header}>Live Matches</Text>
//       </View>

//       <View style={styles.card}>
//       <View style={styles.teamsContainer}>
//         <Text style={styles.title}>{data.match}</Text>
//         <Text style={styles.status}>{data.status}</Text>
//       </View>
//         <View style={styles.teamsContainer}>
//           <Text style={styles.team}>{data.team1}</Text>
//           <Text style={styles.score}>{data.score1}</Text>
//         </View>

//         <View style={styles.teamsContainer}>
//           <Text style={styles.team}>{data.team2}</Text>
//           <Text style={styles.score}>{data.score2}</Text>
//         </View>

//         <Text style={styles.note}>{data.note}</Text>
//         <Text style={styles.championship}>{data.championship}</Text>
//       </View>

//       <TouchableOpacity style={styles.viewDetailsButton}>
//         <Text style={styles.viewDetailsText}>View Details</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const LiveMatches = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [data, setData] = useState({
    match: "Test 3 of 3 (ENG leads 2-0) - Ends of day 1",
    status: "Live",
    team1: "New Zealand",
    score1: "315/9 (82)",
    team2: "England",
    score2: "Yet to bat",
    note: "ENG chose to bowl",
    championship: "T20 Men's Championship",
  });

  const navigation = useNavigation(); 

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        OpenSans: require('../../../assets/fonts/OpenSans-Regular.ttf'),
        OpenSansBold: require('../../../assets/fonts/OpenSans-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
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

      <View style={styles.card}>
        <View style={styles.teamsContainer}>
          <Text style={styles.title}>{data.match}</Text>
          <Text style={styles.status}>{data.status}</Text>
        </View>
        <View style={styles.teamsContainer}>
          <Text style={styles.team}>{data.team1}</Text>
          <Text style={styles.score}>{data.score1}</Text>
        </View>
        <View style={styles.teamsContainer}>
          <Text style={styles.team}>{data.team2}</Text>
          <Text style={styles.score}>{data.score2}</Text>
        </View>

        <Text style={styles.note}>{data.note}</Text>
        <Text style={styles.championship}>{data.championship}</Text>
      </View>

      <TouchableOpacity 
        style={styles.viewDetailsButton} 
        onPress={() => navigation.navigate('DetailView')}
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LiveMatches;

// Add your existing styles here.

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
  status: {
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    color: '#03CAAA',
    marginLeft: 10,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  team: {
    fontSize: 16,
    fontFamily: 'OpenSansBold',
    color: '#fff',
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
  championship: {
    fontSize: 12,
    fontFamily: 'OpenSans',
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
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'OpenSansBold',
  },
});

