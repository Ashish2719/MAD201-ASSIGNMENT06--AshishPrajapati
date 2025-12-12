/*
 * Course: MAD201-01
 * Assignment: 6
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Entry screen redirecting to the news feed.
 */

import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  useEffect(() => {
    // Simulate loading then go to tabs
    setTimeout(() => {
      router.replace('/screens/NewsTabs');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily News 📰</Text>
      <ActivityIndicator size="large" color="#c0392b" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#c0392b' },
});