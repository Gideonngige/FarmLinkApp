import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";


export default function Notifications(){
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // get notifications function
        useEffect(() => {
        const fetchNotifications = async () => {
          const farmer_id = await AsyncStorage.getItem("farmer_id");
          setIsLoading(true);
            try {
              const res = await fetch(`https://farmlinkbackend-qupt.onrender.com/get_farmer_notifications/${farmer_id}`);
              const data = await res.json();
              setNotifications(data);
            } catch (err) {
              alert("Error fetching products");
              console.error('Error fetching products:', err);
            }
            finally{
              setIsLoading(false);
            }
           
        };
    
        fetchNotifications();
      }, []);

      const renderItem = ({ item }) => (
          <View className="w-full bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
      {/* Header: Icon + Date + Type */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="bell-ring" size={20} color="#166534" />
          <Text className="text-sm text-gray-500 font-lato">{item.created_at}</Text>
        </View>
        <Text className="text-sm font-semibold text-green-800 lowercase font-lato">alert</Text>
      </View>

      {/* Message */}
      <Text className="text-gray-800 text-base leading-5 font-lato">{item.message}</Text>
    </View>
        );
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">

    {isLoading ? (
      <Text>Loading notifications...</Text>
    ) : notifications.length === 0 ? (
      <Text>You do not have notification at the moment</Text>
    ) : (
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 0 }}
      />
    )}
       
      
      <StatusBar style="auto" />
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}