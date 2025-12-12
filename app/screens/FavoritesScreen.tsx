/*
 * Course: MAD201-01
 * Assignment: 6
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Displays saved articles stored in AsyncStorage.
 */

import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNews } from '../context/NewsContext';

export default function FavoritesScreen() {
  const { favorites, removeFromFavorites } = useNews();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No saved articles yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <TouchableOpacity 
                style={styles.removeBtn} 
                onPress={() => removeFromFavorites(item.title)}
              >
                <MaterialIcons name="delete" size={20} color="#c0392b" />
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: 'gray' },
  card: { flexDirection: 'row', backgroundColor: '#fff', margin: 10, borderRadius: 10, overflow: 'hidden', elevation: 3 },
  thumbnail: { width: 100, height: 100 },
  textContainer: { flex: 1, padding: 10, justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: 'bold' },
  removeBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' },
  removeText: { color: '#c0392b', fontSize: 12, marginLeft: 5 },
});