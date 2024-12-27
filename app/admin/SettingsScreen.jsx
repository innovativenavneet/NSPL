import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Ensure the firebaseConfig is correctly set up
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 for icons
import * as SecureStore from 'expo-secure-store'; // Import SecureStore

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      console.log('User logged out');
      // Remove the uid from SecureStore
      await SecureStore.deleteItemAsync('uid');
      
      // Reset to root navigation after logout
      navigation.reset({
        index: 0,
        routes: [{ name: 'UserStack' }], // Change to your root screen
      });
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleProfile = () => {
    navigation.navigate('HomeScreen'); 
    console.log('AdminFooter clicked');
  };

  const ChangePassword = () => {
    navigation.navigate('ForgotPasswordScreen'); 
    console.log('ForgotPasswordScreen clicked');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Profile Section */}
      <TouchableOpacity style={styles.button} onPress={handleProfile}>
        <FontAwesome5 name="user" size={20} color="#006D75" style={styles.icon} />
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      {/* Change Password Section */}
      <TouchableOpacity style={styles.button} onPress={ChangePassword}>
        <FontAwesome5 name="key" size={20} color="#006D75" style={styles.icon} />
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBBDB3',
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006D75',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignSelf: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Vertically align icon and text
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006D75',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#7C000E',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Vertically align icon and text
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default SettingsScreen;
