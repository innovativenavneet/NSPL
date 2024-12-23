import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BallSelectionScreen from "./BallSelectionScreen";
import MatchType from "./MatchType";
import AdminStack from "../admin/AdminStack";
import Footer from "../tabs/Footer";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      {/* User Screens */}
      <Stack.Screen
        name="BallSelectionScreen"
        options={{ headerShown: false }}
      >
        {({ navigation }) => (
          <BallSelectionScreen
            onAdminAccess={() => navigation.navigate("AdminStack")}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="MatchType"
        options={{ headerShown: false }}
      >
        {({ navigation }) => (
          <MatchType
            onAdminAccess={() => navigation.navigate("AdminStack")}
          />
        )}
      </Stack.Screen>

      {/* Admin Screens */}
      <Stack.Screen
        name="AdminStack"
        component={AdminStack}
        options={{ headerShown: false }}
      />

      {/* Footer */}
      <Stack.Screen
        name="Footer"
        component={Footer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
