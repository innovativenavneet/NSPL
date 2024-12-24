import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

const MatchForm = () => {
  const navigation= useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Match and Team Names</Text>
      <TextInput style={styles.input} placeholder="Match Name" placeholderTextColor="#555" />
      <TextInput style={styles.input} placeholder="Team Name A" placeholderTextColor="#555" />
      <TextInput style={styles.input} placeholder="Team Name B" placeholderTextColor="#555" />
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('MatchUpdateScreen')}
      >

        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0aa1a1", // Matches the teal color in the design
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 45,
    marginTop: 20,
    marginHorizontal: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0aa1a1",
  },
});

export default MatchForm;
