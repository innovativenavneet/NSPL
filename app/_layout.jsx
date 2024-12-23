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

  // const [isAdmin, setIsAdmin] = useState(false); 
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    OpenSansRegular: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  useEffect(() => {
    // async function will not block resources 
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
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

 
  if (!appReady || !fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <Stack.Navigator>
        {/* {isAdmin ? (
          <Stack.Screen
            name="AdminStack"
            component={AdminStack}  
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
        )} */}

        <Stack.Screen
            name="UserStack"
            component={UserStack}  
            options={{ headerShown: false }}
          ></Stack.Screen>
      </Stack.Navigator>
</ThemeProvider>
  );
}
