import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function PlacedOrders(){
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-2">
    <View className="flex-1 bg-white justify-center items-center font-sans">

        <View className="flex-row mt-4 mx-4 rounded-lg overflow-hidden bg-white shadow-md">
  {/* Product Image */}
  <Image
    source={require('../assets/images2/beans.png')}
    className="w-40 h-60"
    resizeMode="cover"
  />

  {/* Info Section */}
  <View className="flex-1 p-4 justify-between bg-black/5">
    <View className="space-y-1">
      <Text className="font-bold text-lg text-green-800">BEANS</Text>
      <Text className="font-semibold">Name: <Text className="text-green-800">John Doe</Text></Text>
      <Text className="font-semibold">Quantity: <Text className="text-green-800">5Kg</Text></Text>
      <Text className="font-semibold">Paid: <Text className="text-green-800">Ksh.300</Text></Text>
      <Text className="font-semibold">Location: <Text className="text-green-800">Sabasaba</Text></Text>
      <Text className="font-semibold">Phone: <Text className="text-green-800">0797655727</Text></Text>
      <Text className="font-semibold text-green-800 mt-1">07/12/2025 08:00 am</Text>
    </View>

    {/* Action Button */}
    <TouchableOpacity className="mt-4 bg-green-800 rounded-md h-10 justify-center">
      <Text className="text-center text-white font-bold">Delivered</Text>
    </TouchableOpacity>
  </View>
</View>


<View className="flex-row mt-4 mx-4 rounded-lg overflow-hidden bg-white shadow-md">
  {/* Product Image */}
  <Image
    source={require('../assets/images2/spinach.png')}
    className="w-40 h-60"
    resizeMode="cover"
  />

  {/* Info Section */}
  <View className="flex-1 p-4 justify-between bg-black/5">
    <View className="space-y-1">
      <Text className="font-bold text-lg text-green-800">SPINACH</Text>
      <Text className="font-semibold">Name: <Text className="text-green-800">John Doe</Text></Text>
      <Text className="font-semibold">Quantity: <Text className="text-green-800">5Kg</Text></Text>
      <Text className="font-semibold">Paid: <Text className="text-green-800">Ksh.300</Text></Text>
      <Text className="font-semibold">Location: <Text className="text-green-800">Sabasaba</Text></Text>
      <Text className="font-semibold">Phone: <Text className="text-green-800">0797655727</Text></Text>
      <Text className="font-semibold text-green-800 mt-1">07/12/2025 08:00 am</Text>
    </View>

    {/* Action Button */}
    <TouchableOpacity className="mt-4 bg-green-800 rounded-md h-10 justify-center">
      <Text className="text-center text-white font-bold">Delivered</Text>
    </TouchableOpacity>
  </View>
</View>

<View className="flex-row mt-4 mx-4 rounded-lg overflow-hidden bg-white shadow-md">
  {/* Product Image */}
  <Image
    source={require('../assets/images2/carrots.png')}
    className="w-40 h-60"
    resizeMode="cover"
  />

  {/* Info Section */}
  <View className="flex-1 p-4 justify-between bg-black/5">
    <View className="space-y-1">
      <Text className="font-bold text-lg text-green-800">CARROTS</Text>
      <Text className="font-semibold">Name: <Text className="text-green-800">John Doe</Text></Text>
      <Text className="font-semibold">Quantity: <Text className="text-green-800">5Kg</Text></Text>
      <Text className="font-semibold">Paid: <Text className="text-green-800">Ksh.300</Text></Text>
      <Text className="font-semibold">Location: <Text className="text-green-800">Sabasaba</Text></Text>
      <Text className="font-semibold">Phone: <Text className="text-green-800">0797655727</Text></Text>
      <Text className="font-semibold text-green-800 mt-1">07/12/2025 08:00 am</Text>
    </View>

    {/* Action Button */}
    <TouchableOpacity className="mt-4 bg-green-800 rounded-md h-10 justify-center">
      <Text className="text-center text-white font-bold">Delivered</Text>
    </TouchableOpacity>
  </View>
</View>


<View className="flex-row mt-4 mx-4 rounded-lg overflow-hidden bg-white shadow-md">
  {/* Product Image */}
  <Image
    source={require('../assets/images2/maize.png')}
    className="w-40 h-60"
    resizeMode="cover"
  />

  {/* Info Section */}
  <View className="flex-1 p-4 justify-between bg-black/5">
    <View className="space-y-1">
      <Text className="font-bold text-lg text-green-800">MAIZE</Text>
      <Text className="font-semibold">Name: <Text className="text-green-800">John Doe</Text></Text>
      <Text className="font-semibold">Quantity: <Text className="text-green-800">5Kg</Text></Text>
      <Text className="font-semibold">Paid: <Text className="text-green-800">Ksh.300</Text></Text>
      <Text className="font-semibold">Location: <Text className="text-green-800">Sabasaba</Text></Text>
      <Text className="font-semibold">Phone: <Text className="text-green-800">0797655727</Text></Text>
      <Text className="font-semibold text-green-800 mt-1">07/12/2025 08:00 am</Text>
    </View>

    {/* Action Button */}
    <TouchableOpacity className="mt-4 bg-green-800 rounded-md h-10 justify-center">
      <Text className="text-center text-white font-bold">Delivered</Text>
    </TouchableOpacity>
  </View>
</View>






        
      
      <StatusBar style="auto" />
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}