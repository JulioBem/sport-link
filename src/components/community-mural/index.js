/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import CommunityPost from "../community-post";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const CommunityMural = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts/all`, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2260A8" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.muralContainer}>
      <FlatList
        scrollEnabled={false}
        data={posts}
        renderItem={({ item }) => (
          <CommunityPost key={item.id} author={item.author} post={item.post} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  muralContainer: {
    width: "100%",
    height: "100%",
    marginTop: 19.5,
  },
  flatListContent: {
    paddingBottom: 20, // Adicione padding se necessário
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommunityMural;
