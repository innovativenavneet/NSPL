import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from "../tabs/HeaderUser"; // Ensure this path is correct

export default function PlayersScreen() {
  return (
    <View style={styles.container}>
      <Header />  
      <View style={styles.content}>
        <Text>hello i am PlayerScreen .</Text>
      </View>
    </View>
  );
}

// Adjusted styles for the HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  // Start from top of the screen
  },
  content: {
    flex: 1,
    justifyContent: 'center',  // Center content vertically
    alignItems: 'center',
    paddingTop: 20,  // Add padding to adjust for header space
  },
});
