/*
 * Course: MAD201-01
 * Assignment: 6
* Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Root Stack setup wrapping the app in NewsProvider.
 */

import { Stack } from 'expo-router';
import React from 'react';
import { NewsProvider } from './context/NewsContext';



export default function RootLayout() {
  return (
    <NewsProvider>
      <Stack screenOptions={{ 
        headerStyle: { backgroundColor: '#c0392b' },
        headerTintColor: '#fff',
      }}>
        {/* Splash Screen */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        {/* Tabs Navigator */}
        <Stack.Screen 
            name="screens/NewsTabs" 
            options={{ headerShown: false }} 
        />
        
        {/* Detail Screen */}
        <Stack.Screen 
          name="DetailScreen" 
          options={{ title: 'Article Details' }} 
        />
      </Stack>
    </NewsProvider>
  );
}