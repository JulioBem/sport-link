import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="comunidade" options={{ headerShown: false }} />
    </Stack>
  );
}
