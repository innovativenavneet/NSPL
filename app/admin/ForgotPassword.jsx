import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../../firebaseConfig"; // Ensure firebaseConfig is properly set up

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert("Success", "Password reset email sent. Check your inbox.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <LinearGradient colors={["#d3d3d3", "#008080"]} style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#008080",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});

export default ForgotPasswordScreen;
