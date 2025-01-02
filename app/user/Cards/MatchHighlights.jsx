import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const MatchHighlights = () => {
  const matchData = [
    {
      match: "Madhya Pradesh Vs Uttarakhand",
      youtubeLink: "https://www.youtube.com/watch?v=QB-duA7lrLc&ab_channel=NAYABSPORTSPLAYER%27SLEAGUE",
    },
    {
      match: "Jharkhand Vs Chattisgarh",
      youtubeLink: "https://www.youtube.com/watch?v=vMk0G2Xg7zU&ab_channel=NAYABSPORTSPLAYER%27SLEAGUE",
    },
  ];

  const openYoutubeLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <FontAwesome5 name="play-circle" size={30} color="#7C000E" />
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
            <FontAwesome5
              name="play-circle"
              size={50}
              color="#f0f0f0"
              style={styles.youtubeIcon}
            />
            <Text style={styles.viewDetailsText}>
              View Highlights on YouTube
            </Text>
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
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: 'OpenSansBold',
    color: '#000',
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#13808B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  match: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'OpenSans',
    color: '#fff',
    flexWrap: 'wrap', // Ensure long match names wrap correctly
  },
  youtubeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: '#C6011F', // To make the button stand out
    marginTop: 10,
    maxWidth: Dimensions.get('window').width - 40, // Avoid overflow
  },
  youtubeIcon: {
    marginRight: 15,
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'OpenSansBold',
    flexShrink: 1,  // Ensures text wraps and doesn't overflow
    textAlign: 'left',
  },
});

export default MatchHighlights;
