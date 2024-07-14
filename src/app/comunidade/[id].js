import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import CommunityHeader from "./../../components/community-header";

export default function Comunidade(props) {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <CommunityHeader {...props} />
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <Text>Página de usuário com id {id}</Text>
        <Link href="/">Ir para home</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {},
  // main: {
  //   flex: 1,
  //   justifyContent: "center",
  //   maxWidth: 960,
  //   marginHorizontal: "auto",
  // },
  // title: {
  //   fontSize: 64,
  //   fontWeight: "bold",
  // },
  // subtitle: {
  //   fontSize: 36,
  //   color: "#38434D",
  // },
});
