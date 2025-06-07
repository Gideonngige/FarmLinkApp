import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import '../global.css';

export default function SignIn() {
  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // start of handle login
  const handleSignIn = async () => {
    if(email == "" || password == ""){
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Empty fields",
        text2: "Please fill in all fields",
      });
      return;
    }
    else{
    setIsLoading(true);
    try {
      const response = await fetch('https://farmlinkbackend-qupt.onrender.com/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      
      const data = await response.json();
      if (response.status === 200) {
        await AsyncStorage.setItem("farmer_id", data.farmer_id.toString());
        await AsyncStorage.setItem("farmer_name", data.farmer_name);
        await AsyncStorage.setItem("farmer_email", data.farmer_email);
        await AsyncStorage.setItem("phone_number", data.phone_number);
        await AsyncStorage.setItem("area_of_residence", data.area_of_residence);
        await AsyncStorage.setItem("profile_image", data.profile_image);
        await AsyncStorage.setItem("date_joined", data.date_joined);
        router.push("/");
        
      } 
      else {
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "Login failed",
          text2: response.data.message,
        });
        // alert("Login Failed:", response.data);
        return null;
      }
    } catch (error) {
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Login failed",
        text2: error.message,
      });
      return null;
    }
    finally{
      setIsLoading(false);
    }
  }
  };
   // end of handle login

  
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <Text className="text-3xl font-bold text-green-800 mb-1">SIGN IN</Text>
      <Image source={require('../assets/images2/farmlink.png')} className="w-full h-56 mb-2" style={{ resizeMode:"contain", height:150}}/>
      <Text className="w-full text-green-800 text-lg font-bold">Email</Text>
      <TextInput 
      placeholder="eg.johndoe@example.com"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-green-800 text-gray-400 text-lg"
      />
      <Text className="w-full text-green-800 text-lg font-bold">Password</Text>
      <TextInput 
      placeholder="********"
      secureTextEntry
      value={password}
      onChangeText={setPassword} 
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-2 border border-green-800 text-gray-400 text-lg"
      />
      
      <TouchableOpacity className="w-full flex-row justify-end m-4" onPress={() => router.push("/forgotpassword")}>
      <Text className="text-lg">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-green-800 p-4 rounded-lg" onPress={handleSignIn }>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">SignIn</Text> }
        
      </TouchableOpacity>
      <View className="flex-row justify-center mt-4">
      <Text className="text-lg">Do not have an account? </Text>
      <TouchableOpacity onPress={() => router.push("/signup")}>
      <Text className="text-lg text-green-800">SignUp</Text>
      </TouchableOpacity>
      </View>
      <Toast/>
      {/* <StatusBar
      barStyle="dark-content" // or "light-content" depending on your background
      backgroundColor="transparent"
      translucent={true}
      /> */}
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}
