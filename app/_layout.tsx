import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import NameScreen from './NameScreen'
import { AuthProvider } from '../config/AuthContext';




export default function RootLayout() {
  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    
  })


  return (
    <AuthProvider>
    <Stack screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="index"/>
      {/* <Stack.Screen name="(tabs)"/> */}
    </Stack>
  </AuthProvider>
  );
}
