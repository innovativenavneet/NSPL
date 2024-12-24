import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';

const MatchHighlights = () => {
  const matchData = [
    {
      match: "India vs Pakistan",
      youtubeLink: "https://www.youtube.com/watch?v=WQdqgrWvy6g&ab_channel=AsianCricketCouncil", // Replace with actual YouTube link
    },
    {
      match: "India vs Sri Lanka",
      youtubeLink: "https://www.youtube.com/watch?v=vdNrPdeEuYQ&ab_channel=AsianCricketCouncil", // Replace with actual YouTube link
    }
  ];

  const openYoutubeLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../../assets/startingflow/CricketBall.png')}
          style={styles.logo}
        />
        <Text style={styles.header}>Match Highlights</Text>
      </View>

      {matchData.map((match, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.match}>
            <Text style={styles.title}>{match.match}</Text>
          </View>
          <TouchableOpacity
            style={styles.youtubeButton}
            onPress={() => openYoutubeLink(match.youtubeLink)}
          >
            <Image
              source={require('../../../assets/startingflow/highlights.png')} 
              style={styles.youtubeIcon}
            />
            <Text style={styles.viewDetailsText}>View Highlights on YouTube</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  title: {
    fontSize: 16,
    fontFamily: 'OpenSans',
    color: '#fff',
  },
  youtubeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  youtubeIcon: {
    width: 100,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'OpenSansBold',
  },
});

export default MatchHighlights;
