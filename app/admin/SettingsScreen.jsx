import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Add logout functionality here
    console.log('User logged out');
    navigation.navigate('LoginScreen'); 
  };

  const handleOtherAction = (actionName) => {
    // Handle other settings actions
    console.log(`${actionName} clicked`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Profile Section */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleOtherAction('Profile')}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      {/* Change Password Section */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleOtherAction('Change Password')}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006D75',
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default SettingsScreen;
