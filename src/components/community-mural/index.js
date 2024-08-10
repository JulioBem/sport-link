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
import OrdinaryInput from "../ordinary-input";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const CommunityMural = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTxt, setNewPostTxt] = useState("");
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
      <View style={styles.postInputBox}>
        <OrdinaryInput
          placeholder="Escreva sua postagem..."
          keyboardType="text"
          inputMode="text"
          isMultiLine={false}
          numberOfLines={1}
          isFilled={false}
          backgroundColor="#fff"
          hasSendIcon={true}
          value={newPostTxt}
          onChangeText={setNewPostTxt}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  muralContainer: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  postInputBox: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 15,
    width: "100%",
    height: 75,
    position: "fixed",
    bottom: "0",
  },
});

export default CommunityMural;
