import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BallSelectionScreen from './BallSelectionScreen';  // Example screen
import MatchType from './MatchType';
const Stack = createNativeStackNavigator();

export default function UserStack({ onAdminAccess }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BallSelectionScreen"
        component={BallSelectionScreen}
        options={{ headerShown: false }}
      />
         <Stack.Screen
        name="MatchType"
        component={MatchType}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
