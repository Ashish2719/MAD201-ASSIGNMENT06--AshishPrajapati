/*
 * Course: MAD201-01
 * Assignment: 6
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Developer profile information.
 */

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
  // My profile image
  source={require('../../assets/images/Ashish.jpeg')} 
  style={styles.avatar} 
/>
        <Text style={styles.name}>ASHISH PRAJAPATI</Text>
        <Text style={styles.id}>ID: A00194842</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Course:</Text>
        <Text style={styles.value}>MAD201 - Cross Platform Dev</Text>
        
        <Text style={styles.label}>Assignment:</Text>
        <Text style={styles.value}>6 - News Reader App</Text>

        <Text style={styles.description}>
          This app fetches real-time technology news using the Inshorts API and allows users to persist favorite articles locally.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', padding: 30, backgroundColor: '#f9f9f9' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  id: { fontSize: 16, color: 'gray' },
  infoBox: { padding: 30 },
  label: { fontSize: 14, color: '#c0392b', fontWeight: 'bold', marginTop: 15 },
  value: { fontSize: 18, color: '#333' },
  description: { marginTop: 30, fontStyle: 'italic', color: '#666', lineHeight: 22 },
});