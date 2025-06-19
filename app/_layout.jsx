import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NotificationIcon from './NotificationIcon';
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown: true}}>
        <Stack.Screen name="index"options={{title:"Welcome"}}  />
        <Stack.Screen name="home"options={{title:"Farm Link", headerRight: () => <NotificationIcon/> }}   />
        <Stack.Screen name="replies"options={{title:"Replies"}}  />
        <Stack.Screen name="signin"options={{title:"SignIn"}}  />
        <Stack.Screen name="signup"options={{title:"SignUp"}}  />
        <Stack.Screen name="forgotpassword"options={{title:"Forgot Password"}}  />
        <Stack.Screen name="question"options={{title:"Ask Question"}}  />
        <Stack.Screen name="chatai"options={{title:"Chat AI"}}  />
        <Stack.Screen name="products"options={{title:"Products"}}  />
        <Stack.Screen name="sell"options={{title:"Sell"}}  />
        <Stack.Screen name="notifications"options={{title:"Notifications"}}  />
        <Stack.Screen name="orders"options={{title:"Orders"}}  />
        <Stack.Screen name="placedorders"options={{title:"Placed Orders"}}  />
        <Stack.Screen name="buy"options={{title:"Buy"}}  />

      </Stack>
    </SafeAreaProvider>
  );
}
