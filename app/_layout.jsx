import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown: true}}>
        <Stack.Screen name="index"options={{title:"Farm Link"}}  />
        <Stack.Screen name="replies"options={{title:"Replies"}}  />
        <Stack.Screen name="signin"options={{title:"SignIn"}}  />
        <Stack.Screen name="signup"options={{title:"SignUp"}}  />
        <Stack.Screen name="forgotpassword"options={{title:"Forgot Password"}}  />
        <Stack.Screen name="question"options={{title:"Ask Question"}}  />

      </Stack>
    </SafeAreaProvider>
  );
}
