import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function Orders(){
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">

        <View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
          <Image
            source={require('../assets/images2/beans.png')}
            className="h-40 w-40"
          />
        
          <View className="flex-1 p-4 justify-between bg-black/10">
            <View>
              <Text className="font-bold mb-2">
                Available: <Text className="text-green-800">20kg</Text>
              </Text>
              <Text className="font-bold mb-4">
                Price: <Text className="text-green-800">Ksh.60/kg</Text>
              </Text>
            </View>
        
            <TouchableOpacity className="bg-green-800 rounded-lg h-10 items-center justify-center">
              <Text className="text-white font-bold">BUY</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      
      <StatusBar style="auto" />
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}