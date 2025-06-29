import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import NavBar from "./NavBar";
import "../global.css";


export default function Orders(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [markingId, setMarkingId] = useState(null);
    const [isMarking, setMarking] = useState(false);
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

    // Mark order as delivered
  const markAsDelivered = async (orderId, paid) => {
    const amount = paid * 0.85
     setMarkingId(orderId);
    try{
    const response = await fetch('https://payments-5rvq.onrender.com/b2c/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone:"254797655727",
          amount: parseFloat(amount),
        }),
      });

    if(response.ok){
      try {
      await axios.get(`https://farmlinkbackend-qupt.onrender.com/confirm_order/${orderId}/`); // Replace with your endpoint
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, delivered: true } : order
        )
      );
      alert('Order marked as delivered.');
    } catch (err) {
      console.error(err);
      alert('Failed to update delivery status.');
    }
    }
    }
    catch(err){
      console.log(err);
    }
    finally{
      setMarkingId(null);
    }

  };




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
          <TouchableOpacity
  className="mt-4 bg-green-800 rounded-md h-10 justify-center items-center flex-row"
  onPress={() => markAsDelivered(item.id, item.amount)}
  disabled={markingId === item.id}
>
  {markingId === item.id ? (
    <>
      <ActivityIndicator size="small" color="#fff" className="mr-2" />
      <Text className="text-white font-bold">Marking...</Text>
    </>
  ) : (
    <Text className="text-white font-bold">Mark as Delivered</Text>
  )}
</TouchableOpacity>

        </View>
      </View>
    );

    
    return(
        <SafeAreaView className="flex-1 bg-white mb-0">
          {isLoading ? (
        <Text className="m-4">Loading products...</Text>
      ) : orders.length === 0 ? (
        <Text className="m-4">You have not received any order.</Text>
      ) : (
        <FlatList
          data={orders}
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