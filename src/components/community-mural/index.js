import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CommunityPost from "../community-post";

const CommunityMural = () => {
  const posts = [
    {
      id: 1,
      author: {
        imageURI: "https://placehold.co/50.png",
        authorName: "John",
        authorSurname: "Doe",
      },
      post: {
        postContent:
          "Pessoal, os responsáveis pelos equipamentos avisaram que houve uma confusão nos agendamentos. Atrasei o horário do nosso encontro em 20 minutos!",
        postDate: "16:48 - 17jul",
      },
    },
    {
      id: 2,
      author: {
        imageURI: "https://placehold.co/50.png",
        authorName: "Jane",
        authorSurname: "Smith",
      },
      post: {
        postContent:
          "Lembrete: nossa próxima reunião será na sexta-feira às 14h.",
        postDate: "14:00 - 16jul",
      },
    },
  ];

  return (
    <View style={styles.muralContainer}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <CommunityPost key={item.id} author={item.author} post={item.post} />
        )}
        keyExtractor={(item) => item.id.toString()}
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
});

export default CommunityMural;
