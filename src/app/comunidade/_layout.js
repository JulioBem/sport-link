import React from "react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function EventoLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
      }}
      style={styles.container}
    >
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/evento/[eventId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="[id]/evento/[eventId]/organizacao"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="[id]/evento/[eventId]/pagamentos"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="[id]/evento/[eventId]/participantes"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});
