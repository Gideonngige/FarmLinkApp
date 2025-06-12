import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function Products(){
  const router = useRouter()
    const [productName, setProductName] = useState("");

    useEffect(()=>{
        const fetchData= async()=>{
            const product_name = await AsyncStorage.getItem("product_name");
            setProductName(product_name);
        }
        fetchData();

    },[]);

    // function to handle sell
    const handleSell= ()=>{
        router.push('/sell');
    }
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <View className='flex-row m-8'>
        <Text className='font-bold w-40 text-lg'>{productName}</Text>
        <TouchableOpacity className='bg-green-800 w-40  p-2 rounded-lg' onPress={handleSell}>
        <Text className='text-white font-bold text-center'>SELL</Text>
        </TouchableOpacity>
      </View>
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white p-2 font-sans">
      
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

<View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
  <Image
    source={require('../assets/images2/carrots.png')}
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

<View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
  <Image
    source={require('../assets/images2/maize.png')}
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

<View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
  <Image
    source={require('../assets/images2/blueberries.png')}
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

<View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
  <Image
    source={require('../assets/images2/spinach.png')}
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