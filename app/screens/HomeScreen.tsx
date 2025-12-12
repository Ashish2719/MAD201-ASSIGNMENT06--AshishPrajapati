/*
 * Course: MAD201-01
 * Assignment: 6
* Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Displays a list of news articles with title, image, and short description.
 */

import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Article, useNews } from '../context/NewsContext';

export default function HomeScreen() {
  const { articles, loading } = useNews();

  // 1. Core Navigation Function

const handlePress = (article: Article) => {
    router.push({
      pathname: '/DetailScreen',
      params: { 
        title: article.title,
        author: article.author || 'Unknown',
        content: article.content || 'No content available',
        imageUrl: article.imageUrl || 'https://via.placeholder.com/150',
        url: article.url || 'http://example.com', 
      }
    });
};

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#c0392b" />
        <Text style={{ marginTop: 10 }}>Fetching latest headlines...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item }) => (
          // 2. Tappable Component calls the navigation function
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Image 
              source={{ uri: item.imageUrl ? item.imageUrl : 'https://via.placeholder.com/150' }} 
              style={styles.thumbnail} 
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.content ? item.content : "Click to read more details..."}
              </Text>
              <Text style={styles.author}>By {item.author || "Unknown"}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No articles found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { flexDirection: 'row', backgroundColor: '#fff', margin: 10, borderRadius: 10, overflow: 'hidden', elevation: 3 },
  thumbnail: { width: 100, height: 120, backgroundColor: '#eee' }, 
  textContainer: { flex: 1, padding: 10, justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 12, color: '#444', marginBottom: 5 },
  author: { fontSize: 10, color: 'gray' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#555' }
});