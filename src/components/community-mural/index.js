import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";
import CommunityPost from "../community-post";
import OrdinaryInput from "../ordinary-input";

// eslint-disable-next-line no-undef
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

        const formattedPosts = data.map((post) => ({
          ...post,
          post: {
            ...post.post,
            postDate: new Date(post.post.postDate).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const createPost = async () => {
    if (newPostTxt.trim() === "") {
      Alert.alert("Erro", "A postagem não pode estar vazia.");
      return;
    }

    const newPost = {
      author: {
        imageURI: "https://placehold.co/50.png",
        authorName: "John",
        authorSurname: "Doe",
      },
      post: {
        postContent: newPostTxt,
        postDate: new Date().toISOString(),
      },
    };

    try {
      const response = await fetch(`${apiUrl}/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o post");
      }

      const createdPost = await response.json();
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
      setNewPostTxt("");

      return (
        Platform.OS === "android" &&
        ToastAndroid.showWithGravity(
          "Post criado com sucesso",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        )
      );
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      Alert.alert("Erro", "Não foi possível criar o post.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2260A8" />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.muralContainer}>
        <FlatList
          scrollEnabled={false}
          data={posts}
          renderItem={({ item }) => (
            <CommunityPost
              key={item.id}
              author={item.author}
              post={item.post}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </ScrollView>
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
          onSend={createPost} // Adicione esta linha para enviar o post
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  muralContainer: {
    width: "100%",
    height: "100%",
    paddingBottom: 75,
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
    width: "100vw",
    height: 75,
    position: "fixed",
    bottom: "0",
  },
});

export default CommunityMural;
