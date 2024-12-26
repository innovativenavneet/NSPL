import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../admin/HomeScreen";
import PlayersScreen from "../admin/PlayerScreen";
import MatchesScreen from "../admin/MatchesScreen";
import SettingsScreen from "../admin/SettingsScreen";
import MatchForm from "../admin/MatchForm";
import MatchUpdateScreen from "../admin/MatchUpdateScreen";
import PlayerScoreScreens from "../admin/PlayerScoreScreens";
import BallSelectionScreen from "../admin/BallSelectionScreen";
import LiveScoreScreen from "../admin/Cards/CurrentMatches"; // Ensure you import this

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen({ route }) {
  // Destructure params from the route
  const { matchId, matchType, ballType, updatedMatchData } = route?.params || {};

  return (
    <HomeStack.Navigator>
      {/* Home Screen */}
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        initialParams={{ matchId, matchType, ballType, updatedMatchData }} // Pass match data
        options={{ headerShown: false }}
      />
      
      {/* Match Form */}
      <HomeStack.Screen
        name="MatchForm"
        component={MatchForm}
        options={{ headerShown: false }}
      />

      {/* Match Update */}
      <HomeStack.Screen
        name="MatchUpdateScreen"
        component={MatchUpdateScreen}
        options={{ headerShown: false }}
      />

      {/* Player Score */}
      <HomeStack.Screen
        name="PlayerScoreScreens"
        component={PlayerScoreScreens}
        options={{ headerShown: false }}
      />

      {/* Live Score */}
      <HomeStack.Screen
        name="LiveScoreScreen"
        component={LiveScoreScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

export default function AdminFooter({ route }) {
  // Safely extract params and assign default values
  const { matchId = "currentMatch", matchType = "T20", ballType = "Red", updatedMatchData = null } =
    route?.params || {};

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
          <HomeStackScreen
            route={{
              params: { matchId, matchType, ballType, updatedMatchData },
            }}
          />
        )}
      />

      {/* Players Tab */}
      <Tab.Screen name="Players" component={PlayersScreen} />

      {/* Matches Tab */}
      <Tab.Screen name="Matches" component={BallSelectionScreen} />

      {/* Settings Tab */}
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
