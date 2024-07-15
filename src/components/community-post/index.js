import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "@rneui/themed";

const CommunityPost = (props) => {
  const { author, post } = props;

  const { imageURI, authorName, authorSurname } = author || {};
  const { postContent, postDate } = post || {};

  return (
    <View style={styles.postContainer}>
      <View style={styles.authorInfo}>
        <Avatar
          source={{ uri: imageURI || "https://placehold.co/50.png" }}
          size={42}
          rounded
        />
        <Text style={styles.authorName}>{authorName || "Nome"}</Text>
        <Text style={styles.authorSurname}>{authorSurname || "Sobrenome"}</Text>
      </View>
      <View style={styles.postInfo}>
        <Text style={styles.postContent}>
          {postContent ||
            "Pessoal, os responsáveis pelos equipamentos avisaram que houve uma confusão nos agendamentos. Atrasei o horário do nosso encontro em 20 minutos!"}
        </Text>
        <Text style={styles.postDate}>{postDate || "16:48 - 17jul"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: "100%",
    height: 107,
    borderBottomWidth: 1,
    borderBottomColor: "#8E8E93",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 21,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  authorInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
  },
  authorName: {
    fontWeight: "600",
    fontSize: 8,
    whiteSpace: "nowrap",
  },
  authorSurname: {
    fontSize: 8,
    whiteSpace: "nowrap",
  },
  postInfo: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flex: 1,
    marginLeft: 10,
    position: "relative",
  },
  postContent: {
    flexWrap: "wrap",
    fontSize: 11,
    marginBottom: 5,
  },
  postDate: {
    position: "absolute",
    bottom: "12px",
    right: "10px",
    fontSize: "9px",
  },
});

export default CommunityPost;
