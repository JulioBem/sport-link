import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="comunidade" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
