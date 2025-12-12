/*
 * Course: MAD201-01
 * Assignment: 6
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Shows full article and allows saving to favorites.
 */

import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Article, useNews } from './context/NewsContext';

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const { addToFavorites, favorites } = useNews();
  const isFavorite = favorites.some(fav => fav.title === params.title);

  
  const article: Article & { url?: string } = {
    title: params.title as string,
    author: params.author as string,
    content: params.content as string, 
    imageUrl: params.imageUrl as string,
    url: params.url as string, // Full article URL
  };

  const handleSave = () => {
    if (isFavorite) {
        Alert.alert("Already Saved", "This article is already in your favorites.");
        return;
    }
    addToFavorites(article);
    Alert.alert("Success", "Article saved to Favorites!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Display Image */}
      {article.imageUrl && <Image source={{ uri: article.imageUrl }} style={styles.image} />}
      
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.meta}>By {article.author}</Text>
        
        
        <Text style={styles.body}>{article.content}</Text>
        
    
        {article.url && (
            <TouchableOpacity style={styles.readMoreButton} onPress={() => Linking.openURL(article.url)}>
                <Text style={styles.readMoreText}>Read Full Article on Source Website</Text>
            </TouchableOpacity>
        )}

        <TouchableOpacity 
            style={[styles.saveButton, isFavorite && styles.savedButton]} 
            onPress={handleSave}
            disabled={isFavorite}
        >
          <MaterialIcons name={isFavorite ? "bookmark" : "bookmark-border"} size={24} color="#fff" />
          <Text style={styles.saveText}>{isFavorite ? "Already Saved" : "Save to Favorites"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  image: { width: '100%', height: 250, resizeMode: 'cover' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  meta: { fontSize: 14, color: '#c0392b', marginBottom: 20 },
  body: { fontSize: 16, lineHeight: 24, color: '#444', marginBottom: 30 },
  saveButton: { 
    flexDirection: 'row', backgroundColor: '#c0392b', padding: 15, 
    borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20
  },
  savedButton: {
      backgroundColor: '#7f8c8d', // Grey if saved
  },
  saveText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  readMoreButton: {
      padding: 15,
      borderWidth: 1,
      borderColor: '#c0392b',
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
  },
  readMoreText: {
      color: '#c0392b',
      fontWeight: 'bold',
  }
});