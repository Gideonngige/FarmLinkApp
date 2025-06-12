import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";


export default function Notifications(){
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        <View className="w-full bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
      {/* Header: Icon + Date + Type */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="bell-ring" size={20} color="#166534" />
          <Text className="text-sm text-gray-500 font-lato">12/34/2025</Text>
        </View>
        <Text className="text-sm font-semibold text-green-800 lowercase font-lato">alert</Text>
      </View>

      {/* Message */}
      <Text className="text-gray-800 text-base leading-5 font-lato">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam consectetur unde illum harum quis, tenetur esse ex fuga eligendi incidunt molestiae nesciunt vel expedita qui consequuntur earum debitis nisi id?</Text>
    </View>
       
      
      <StatusBar style="auto" />
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}