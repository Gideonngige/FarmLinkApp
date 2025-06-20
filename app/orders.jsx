import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";


export default function Orders(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    // get orders function
      useEffect(() => {
    const fetchOrders = async () => {
      const farmer_id = await AsyncStorage.getItem("farmer_id");
      setIsLoading(true);
        try {
          const res = await fetch(`https://farmlinkbackend-qupt.onrender.com/get_orders/${farmer_id}`);
          const data = await res.json();
          setOrders(data.orders);
        } catch (err) {
          alert("Error fetching orders");
          console.error('Error fetching orders:', err);
        }
        finally{
          setIsLoading(false);
        }
       
    };

    fetchOrders();
  }, []);

   // item
    const renderItem = ({ item }) => (
      <View className="flex-row mt-4 mx-4 rounded-lg overflow-hidden bg-white shadow-md">
        {/* Product Image */}
        <Image
          source={{ uri:item.product_image}}
          className="w-40 h-60"
          resizeMode="cover"
        />
      
        {/* Info Section */}
        <View className="flex-1 p-4 justify-between bg-black/5">
          <View className="space-y-1">
            <Text className="font-bold text-lg text-green-800">{item.product_name}</Text>
            <Text className="font-semibold">Name: <Text className="text-green-800">{item.farmer_name}</Text></Text>
            <Text className="font-semibold">Quantity: <Text className="text-green-800">{item.quantity}Kg</Text></Text>
            <Text className="font-semibold">Paid: <Text className="text-green-800">Ksh.{item.amount}</Text></Text>
            <Text className="font-semibold">Location: <Text className="text-green-800">{item.farmer_location}</Text></Text>
            <Text className="font-semibold">Phone: <Text className="text-green-800">{item.phone_number}</Text></Text>
            <Text className="font-semibold text-green-800 mt-1">{item.created_at}</Text>
          </View>
      
          {/* Action Button */}
          <TouchableOpacity className="mt-4 bg-green-800 rounded-md h-10 justify-center">
            <Text className="text-center text-white font-bold">Delivered</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    
    return(
        <SafeAreaView className="flex-1 bg-white">
          {isLoading ? (
        <Text>Loading products...</Text>
      ) : orders.length === 0 ? (
        <Text>You have not received any order.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 0 }}
        />
      )}
      
      <StatusBar style="auto" />
      </SafeAreaView>
    
    );
}