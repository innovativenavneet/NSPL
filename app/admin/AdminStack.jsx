import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminScreen from './AdminScreen'; 
import AdminFooter from "../tabs/AdminFooter"
import ForgotPasswordScreen from './ForgotPassword';
const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="AdminFooter"
        component={AdminFooter}
        options={{ headerShown: false }}
      />
             <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
