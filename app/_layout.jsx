import React, { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import AdminStack from './admin/AdminStack';  // Ensure AdminStack doesn't have its own NavigationContainer
import UserStack from './user/UserStack';    // Ensure UserStack doesn't have its own NavigationContainer

import { useColorScheme } from '@/hooks/useColorScheme';
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [isAdmin, setIsAdmin] = useState(false); // Admin state is false initially
  const [appReady, setAppReady] = useState(false);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    OpenSansRegular: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  // Prevent auto-hiding the splash screen
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate asset loading
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  // Hide the splash screen once fonts and assets are ready
  useEffect(() => {
    if (appReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appReady, fontsLoaded]);

  // Show nothing until the app is fully ready
  if (!appReady || !fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <Stack.Navigator>
        {isAdmin ? (
          <Stack.Screen
            name="AdminStack"
            component={AdminStack}  // AdminStack is a component here
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="UserStack"
            options={{ headerShown: false }}
          >
            {() => (
              <UserStack onAdminAccess={() => setIsAdmin(true)} />  // Pass function to toggle admin
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
</ThemeProvider>
  );
}
