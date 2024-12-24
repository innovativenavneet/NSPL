import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
const AdminLoginScreen = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

const navigation = useNavigation();    // Load Fonts
    useEffect(() => {
      const loadFonts = async () => {
        try {
          await Font.loadAsync({
            OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
            OpenSansSemibold: require("../../assets/fonts/OpenSans_SemiCondensed-SemiBold.ttf"),
          });
          setFontsLoaded(true);
          console.log("Fonts loaded successfully");
        } catch (error) {
          console.error("Error loading fonts:", error);
        }
      };
  
      loadFonts();
    }, []);
  
    if (!fontsLoaded) {
      return null; // Avoid rendering until fonts are loaded
    }
  const handleLogin = () => {
    // Add your login logic here
    console.log('UserID:', userID);
    console.log('Password:', password);
    navigation.navigate('AdminFooter')
    
  };

  return (
    <LinearGradient colors={["#d3d3d3", "#008080"]} style={styles.container}>

      <Text style={styles.title}>NSPL Admin Login</Text>
      <TextInput
        style={styles.input}
        placeholder="UserID"
        placeholderTextColor="#fff"
        value={userID}
        onChangeText={setUserID}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>


    </LinearGradient>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#008080',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'OpensSnansbold',
    color: '#008080',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default AdminLoginScreen;
