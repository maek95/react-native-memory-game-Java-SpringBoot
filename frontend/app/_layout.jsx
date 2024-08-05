import { Stack } from 'expo-router/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { ContextProvider } from '../context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { View } from 'react-native';
import { AuthProvider } from '../AuthContext';

SplashScreen.preventAutoHideAsync();

export default function Layout() {

  // makes SourceCodePro-Regular an accessible fontFamily throughout the whole project!
  const [loaded, error] = useFonts({
    "SourceCodePro-Regular": require("../assets/fonts/SourceCodePro-Regular.ttf"),
    "SourceCodePro-Medium": require("../assets/fonts/SourceCodePro-Medium.ttf"),
    "SourceCodePro-Bold": require("../assets/fonts/SourceCodePro-Bold.ttf")
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider> 
      <AuthProvider>
      <ContextProvider>
      <Stack screenOptions={{ // style options for all tabs
        tabBarInactiveTintColor: 'teal', 
        tabBarActiveTintColor: 'blue',       
        headerStyle: {
          backgroundColor: "teal",
          borderWidth: 0,
         //  elevation: 0, // Remove shadow on Android // in <Tabs>?
        //  shadowOpacity: 0, // Remove shadow on iOS  // in <Tabs>? 
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: 'SourceCodePro-Medium', 
        },
        tabBarLabelStyle: {
          fontFamily: 'SourceCodePro-Regular', // 'Home', 'Play', 'Profile' in the bottom tab menu
        },
        headerShadowVisible: false, // remove shadow in <Stack>?
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* modals, will not see tab menu at the bottom when entering these pages, will simply have to press back button to go back to index.jsx or profile.jsx - depending on where you came from */}
        <Stack.Screen name='login' options={{title: "Log In", presentation: 'modal'}} /> 
        <Stack.Screen name='createAccount' options={{title: "Register", presentation: 'modal'}} />

      </Stack>
    
      </ContextProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

