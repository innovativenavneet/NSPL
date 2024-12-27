import React, { useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import UserStack from './user/UserStack';
import { useColorScheme } from '@/hooks/useColorScheme';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    OpenSansRegular: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        // Perform any async initialization tasks here
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Optional small delay
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true); // Mark app as ready
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appReady && fontsLoaded) {
      SplashScreen.hideAsync(); // Hide splash screen once ready
    }
  }, [appReady, fontsLoaded]);

  if (!appReady || !fontsLoaded) {
    return null; // Return fallback or loader component if needed
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="UserStack"
          component={UserStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
