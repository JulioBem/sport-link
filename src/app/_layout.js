import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="comunidade" options={{ headerShown: false }} />
      <Stack.Screen name="pagina" options={{ headerShown: false }} />
    </Stack>
  );
}
