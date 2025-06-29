import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import NotificationIcon from './NotificationIcon';
import store from './store/store';
export default function RootLayout() {
  return (
    
    <SafeAreaProvider>
      <Provider store={store}>
      <Stack screenOptions={{headerShown: true}}>
        <Stack.Screen name="index"options={{title:"Welcome"}}  />
        <Stack.Screen name="home"options={{title:"Farm Link", headerRight: () => <NotificationIcon/> }}   />
        <Stack.Screen name="replies"options={{title:"Replies", headerRight: () => <NotificationIcon/>}}  />
        <Stack.Screen name="signin"options={{title:"SignIn"}}  />
        <Stack.Screen name="signup"options={{title:"SignUp"}}  />
        <Stack.Screen name="forgotpassword"options={{title:"Forgot Password"}}  />
        <Stack.Screen name="question"options={{title:"Ask Question", headerRight: () => <NotificationIcon/>}}  />
        <Stack.Screen name="chatai"options={{title:"Chat AI", headerRight: () => <NotificationIcon/>}}  />
        <Stack.Screen name="products"options={{title:"Products", headerRight: () => <NotificationIcon/>}}  />
        <Stack.Screen name="sell"options={{title:"Sell", headerRight: () => <NotificationIcon/>}}  />
        <Stack.Screen name="notifications"options={{title:"Notifications"}}  />
        <Stack.Screen name="orders"options={{title:"Orders", headerRight: () => <NotificationIcon/>}}  />
        <Stack.Screen name="placedorders"options={{title:"Placed Orders", headerRight: () => <NotificationIcon/>}}  />
        <Stack.Screen name="buy"options={{title:"Buy"}}  />
        <Stack.Screen name="display"options={{title:"Redux"}}  />
        <Stack.Screen name="notificationsdetails"options={{title:"Notifications"}}  />

      </Stack>
      </Provider>
    </SafeAreaProvider>
  );
}
