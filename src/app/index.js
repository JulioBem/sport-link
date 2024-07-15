import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Link href="/comunidade/123">Ir para comunidade</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "red",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "blue",
  },
  subtitle: {
    fontSize: 36,
    color: "blue",
  },
});
