import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../user/HomeScreen";
import PlayersScreen from "../user/PlayerScreen";
import MatchesScreen from '../user/MatchesScreen';
import SettingsScreen from '../user/SettingsScreen';


const Tab = createBottomTabNavigator(); 

export default function App() {
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Players') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Matches') {
              iconName = focused ? 'baseball' : 'baseball-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black', 
          tabBarInactiveTintColor: 'white', 
          tabBarStyle: {
            backgroundColor: '#13808B', 
          },
          headerShown: false, 
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Players" component={PlayersScreen} />
        <Tab.Screen name="Matches" component={MatchesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
 
  );
}

// Global StyleSheet
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
