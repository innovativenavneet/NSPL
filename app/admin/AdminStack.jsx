import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AdminScreen from "./AdminScreen";
import AdminFooter from "../tabs/AdminFooter";
import ForgotPasswordScreen from "./ForgotPassword";
import BallSelectionScreen from "./BallSelectionScreen";
import MatchType from "./MatchType";
import MatchForm from "./MatchForm";
import MatchUpdateScreen from "./MatchUpdateScreen";
import PlayerScoreScreens from "./PlayerScoreScreens";
import HomeScreen from "./HomeScreen";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginState = async () => {
      const uid = await SecureStore.getItemAsync("uid");
      if (uid) {
        setIsLoggedIn(true);
      }
    };

    checkLoginState();
  }, []);

  return (
   
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="AdminScreen"
            component={AdminScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="AdminFooter"
            component={AdminFooter}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PlayerScoreScreens" component={PlayerScoreScreens} options={{ headerShown: false }} />
        <Stack.Screen name="MatchUpdateScreen" component={MatchUpdateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MatchForm" component={MatchForm} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BallSelectionScreen" component={BallSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MatchType" component={MatchType} options={{ headerShown: false }} />
      </Stack.Navigator>
   
  );
}
