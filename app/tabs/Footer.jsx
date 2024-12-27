import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "../user/HomeScreen";
import PlayersScreen from "../user/PlayerScreen";
import MatchesScreen from '../user/MatchesScreen';
import SettingsScreen from '../user/SettingsScreen';
import DetailView from '../user/DetailView';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen({ matchType, ballType }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        initialParams={{ matchType, ballType }}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="DetailView"
        component={DetailView}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

export default function AdminFooter({ route }) {
  // Safely extract params and assign default values
  const { matchType = "T20", ballType = "Red" } = route?.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Players") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Matches") {
            iconName = focused ? "baseball" : "baseball-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: {
          backgroundColor: "#13808B",
        },
        headerShown: false,
      })}
    >
      {/* Pass updated match data to HomeStackScreen */}
      <Tab.Screen
        name="Home"
        children={() => (
          <HomeStackScreen matchType={matchType} ballType={ballType} />
        )}
      />

      {/* Players Tab */}
      <Tab.Screen name="Players" component={PlayersScreen} />

      {/* Matches Tab */}
      <Tab.Screen name="Matches" component={MatchesScreen} />

      {/* Settings Tab */}
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
