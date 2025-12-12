/*
 * Course: MAD201-01
 * Assignment: 6
* Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Tab Navigator switching between Home, Favorites, and Profile.
 */

import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

// Import Screens
import FavoritesScreen from './FavoritesScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function NewsTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#c0392b' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#c0392b',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Feed" 
        component={HomeScreen}
        options={{ 
          title: 'Top News',
          tabBarIcon: ({color}) => <MaterialIcons name="article" size={24} color={color} />
        }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ 
          title: 'Saved',
          tabBarIcon: ({color}) => <MaterialIcons name="bookmark" size={24} color={color} />
        }} 
      />
       <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'About',
          tabBarIcon: ({color}) => <MaterialIcons name="person" size={24} color={color} />
        }} 
      />
    </Tab.Navigator>
  );
}