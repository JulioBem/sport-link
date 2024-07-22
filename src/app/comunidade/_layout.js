import React from "react";
import { Stack } from "expo-router";

export default function ComunidadeLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/evento/[eventId]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
