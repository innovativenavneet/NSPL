import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "../admin/HomeScreen";
import PlayersScreen from "../admin/PlayerScreen";
import MatchesScreen from '../admin/MatchesScreen';
import SettingsScreen from '../admin/SettingsScreen';
import MatchForm from '../admin/MatchForm'; 
import MatchUpdateScreen from "../admin/MatchUpdateScreen ";
import PlayerScoreScreens from "../admin/PlayerScoreScreens";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <HomeStack.Screen 
        name="MatchForm" 
        component={MatchForm} 
        options={{ headerShown: false }} 
      />
      <HomeStack.Screen 
        name="MatchUpdateScreen" 
        component={MatchUpdateScreen} 
        options={{ headerShown: false }} 
      />
            <HomeStack.Screen 
        name="PlayerScoreScreens" 
        component={PlayerScoreScreens} 
        options={{ headerShown: false }} 
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        console.log('Rendering icon:', route.name);
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
      tabBarActiveTintColor: 'black', // Gold for active icons
      tabBarInactiveTintColor: '#FFFFFF', // White for inactive icons
      tabBarStyle: {
        backgroundColor: '#13808B', // Dark teal background
      },
      headerShown: false, // Hide headers in tab screens
    })}
  >
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Players" component={PlayersScreen} />
    <Tab.Screen name="Matches" component={MatchesScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
  

  );
}
