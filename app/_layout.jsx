import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown: true}}>
        <Stack.Screen name="index"options={{title:"Farm Link"}}  />
        <Stack.Screen name="replies"options={{title:"Replies"}}  />

      </Stack>
    </SafeAreaProvider>
  );
}
