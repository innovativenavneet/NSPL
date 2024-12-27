import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import * as SecureStore from "expo-secure-store"; // Import SecureStore for persistence
import { FontAwesome5 } from "@expo/vector-icons";

const AdminLoginScreen = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
          OpenSansSemibold: require("../../assets/fonts/OpenSans_SemiCondensed-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!userID || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    if (!isValidEmail(userID)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, userID, password);
      const user = userCredential.user;

      // Save the UID to SecureStore (AsyncStorage is fine too)
      await SecureStore.setItemAsync("uid", user.uid);

      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("AdminFooter");
    } catch (error) {
      const errorMessage =
        error.code === "auth/wrong-password"
          ? "Incorrect password. Please try again."
          : error.message;

      Alert.alert("Login Failed", errorMessage);
      console.log("ERROR", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!userID) {
      Alert.alert("Error", "Please enter your email to reset the password.");
      return;
    }

    if (!isValidEmail(userID)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, userID);
      Alert.alert("Password Reset", "A password reset email has been sent to your email.");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#d3d3d3", "#008080"]} style={styles.container}>
      <Text style={styles.title}>NSPL Admin Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        value={userID}
        onChangeText={setUserID}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="green" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPassword} disabled={loading}>
        <Text style={styles.forgotButtonText}>Forgot Password?</Text>
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
  inputContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    // backgroundColor: "#13808B",
    marginBottom: 10,
    color: "#fff",

  },

  eyeIcon: {
    marginLeft: 150,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,

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
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  forgotButton: {
    marginTop: 15,
  },
  forgotButtonText: {
    fontSize: 14,
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default AdminLoginScreen;
