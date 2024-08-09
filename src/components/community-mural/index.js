import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import CommunityPost from "../community-post";

const CommunityMural = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/posts/all");
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
    <View style={styles.muralContainer}>
      <FlatList
        scrollEnabled={false}
        data={posts}
        renderItem={({ item }) => (
          <CommunityPost key={item.id} author={item.author} post={item.post} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
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
});

export default CommunityMural;
