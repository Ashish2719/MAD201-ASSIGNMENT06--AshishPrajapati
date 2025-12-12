/*
 * Course: MAD201-01
 * Assignment: 6
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Manages fetching news from API and saving favorites to local storage.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Article Interface
export interface Article {
  title: string;
  author: string;
  content: string;
  imageUrl: string;
  url?: string;
  date?: string;
}

interface NewsContextType {
  articles: Article[];
  favorites: Article[];
  addToFavorites: (article: Article) => void;
  removeFromFavorites: (title: string) => void;
  loading: boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch News API on Load (Part A)
  useEffect(() => {
    fetchNews();
    loadFavorites();
  }, []);

  const fetchNews = async () => {
    try {
      // Using a free public news API (Inshorts)
      const response = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json');
      const json = await response.json();
      if (json.articles) {
  setArticles(json.articles); // Assuming json.articles is an array of Article objects
}
    } catch (error) {
      console.error("API Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Load Favorites from AsyncStorage
  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('@favorites');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (error) {
      console.error("Load Storage Error:", error);
    }
  };

  // 3. Add to Favorites (Part B)
  const addToFavorites = async (article: Article) => {
    // Prevent duplicates
    if (favorites.some(fav => fav.title === article.title)) return;

    const updated = [...favorites, article];
    setFavorites(updated);
    await AsyncStorage.setItem('@favorites', JSON.stringify(updated));
  };

  // 4. Remove from Favorites
  const removeFromFavorites = async (title: string) => {
    const updated = favorites.filter(item => item.title !== title);
    setFavorites(updated);
    await AsyncStorage.setItem('@favorites', JSON.stringify(updated));
  };

  return (
    <NewsContext.Provider value={{ articles, favorites, addToFavorites, removeFromFavorites, loading }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error("useNews must be used within NewsProvider");
  return context;
};