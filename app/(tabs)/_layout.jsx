import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
    }}
  >
    <Tabs.Screen 
      name="home" 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => <Octicons name="filter" size={24} color={color} />
      }} 
    />
    <Tabs.Screen 
      name="like" 
      options={{
        tabBarLabel: 'Like',
        tabBarIcon: ({ color }) => <AntDesign name="heart" size={24} color={color} />
      }} 
    />
     <Tabs.Screen 
      name="people" 
      options={{
        tabBarLabel: 'People',
        tabBarIcon: ({ color }) => <FontAwesome6 name="map-location-dot" size={24} color={color} />
      }} 
    />
    <Tabs.Screen 
      name="chat"  
      options={{
        tabBarLabel: 'Chat',
        tabBarIcon: ({ color }) => <Ionicons name="chatbox-outline" size={24} color={color} />
      }} 
    />
    <Tabs.Screen 
      name="profile" 
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={24} color={color} />
      }} 
    />
  </Tabs>
  );
}
