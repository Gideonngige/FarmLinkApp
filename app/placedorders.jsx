import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import NavBar from "./NavBar";


export default function PlacedOrders(){
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [placedOrders, setPlacedOrders] = useState([]);

    // get placedOrders function
      useEffect(() => {
    const fetchPlacedOrders = async () => {
      const farmer_id = await AsyncStorage.getItem("farmer_id");
      setIsLoading(true);
        try {
          const res = await fetch(`https://farmlinkbackend-qupt.onrender.com/get_farmer_orders/${farmer_id}`);
          const data = await res.json();
          setPlacedOrders(data.orders);
        } catch (err) {
          alert("Error fetching orders");
          console.error('Error fetching orders:', err);
        }
        finally{
          setIsLoading(false);
        }
       
    };

    fetchPlacedOrders();
  }, []);

  // item
      const renderItem = ({ item }) => (
        <View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
          <Image
            source={{ uri:item.product_image}}
            className="h-40 w-40"
          />
        
          <View className="flex-1 p-4 justify-between bg-black/10">
            <View>
              <Text className="font-bold mb-2 text-green-800">{item.product_name}</Text>
              <Text className="font-bold mb-2">
                Quantity: <Text className="text-green-800">{item.quantity}</Text>
              </Text>
              <Text className="font-bold mb-2">
                Paid: <Text className="text-green-800">Ksh.{item.amount}</Text>
              </Text>
              <Text className="font-bold mb-2 text-green-800">{item.created_at}</Text>
            </View>
          </View>
        </View>
      );
      

    
    return(
        <SafeAreaView className="flex-1 bg-white mb-10">
          {isLoading ? (
                  <Text className="m-4">Loading products...</Text>
                ) : placedOrders.length === 0 ? (
                  <Text className="m-4">You have not placed any order.</Text>
                ) : (
                  <FlatList
                    data={placedOrders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 0 }}
                  />
                )}
      <NavBar />
      <StatusBar style="auto" />
      </SafeAreaView>
    
    );
}