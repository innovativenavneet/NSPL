import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';  // Importing Expo vector icons

const SettingsScreen = () => {
  const navigation = useNavigation();


  const handleOtherAction = (actionName) => {
    // Handle other settings actions
    console.log(`${actionName} clicked`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        The Login, International Match Status and Live Stream will be added soon
      </Text>

      {/* Profile Section */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleOtherAction('Profile')}
      >
        <AntDesign name="user" size={24} color="#006D75" style={styles.icon} />
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      {/* Change Password Section */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleOtherAction('Change Password')}
      >
        <MaterialIcons name="lock" size={24} color="#006D75" style={styles.icon} />
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} >
        <AntDesign name="logout" size={24} color="#fff" style={styles.icon} />
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'center',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006D75',
    textAlign: 'center',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#7C000E',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginLeft: 10,
  },
});

export default SettingsScreen;
