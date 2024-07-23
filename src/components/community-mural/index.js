import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CommunityPost from "../community-post";
import posts from "../../data/posts.json";

const CommunityMural = () => {
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
