import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import CommunityPost from "../community-post";
import posts from "../../data/posts.json";

const CommunityMural = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.muralContainer}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <CommunityPost
              key={item.id}
              author={item.author}
              post={item.post}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
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
