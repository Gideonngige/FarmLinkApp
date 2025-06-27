import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import { fetchProducts } from './store/productsSlice';


export default function Products(){
  const router = useRouter()
    const [productName, setProductName] = useState("");
    // const [products, setProducts] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

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

    // get products function
      useFocusEffect(
  React.useCallback(() => {
    const loadProducts = async () => {
      const product_name = await AsyncStorage.getItem("product_name");
      dispatch(fetchProducts(product_name));
    };
    loadProducts();
  }, [dispatch])
);

  // function to handle buy item
  const handleBuy=async(product_id, seller_id, price, quantity)=>{
    await AsyncStorage.setItem("product_id", product_id.toString());
    await AsyncStorage.setItem("seller_id", seller_id.toString());
    await AsyncStorage.setItem("price", price.toString());
    await AsyncStorage.setItem("available", quantity.toString());
    router.push('/buy');

  }

  // item
  const renderItem = ({ item }) => (
    <View className="flex-row mt-2 mx-2 rounded-lg overflow-hidden bg-white shadow">
  <Image
    source={{ uri:item.product_image}}
    className="h-40 w-40"
  />

  <View className="flex-1 p-4 justify-between bg-black/10">
    <View>
      <Text className="font-bold mb-2">
        Available: <Text className="text-green-800">{item.quantity} kg</Text>
      </Text>
      <Text className="font-bold mb-4">
        Price: <Text className="text-green-800">Ksh.{item.price}/unit</Text>
      </Text>
    </View>

    <TouchableOpacity onPress={()=>handleBuy(item.id, item.farmer_id, item.price, item.quantity)} className="bg-green-800 rounded-lg h-10 items-center justify-center">
      <Text className="text-white font-bold">BUY</Text>
    </TouchableOpacity>
  </View>
</View>
  );
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <View className='flex-row m-8'>
        <Text className='font-bold w-40 text-lg'>{productName}</Text>

        <TouchableOpacity className='bg-green-800 w-40  p-2 rounded-lg' onPress={handleSell}>
        <Text className='text-white font-bold text-center'>SELL</Text>
        </TouchableOpacity>
      </View>
        
    <View className="flex-1 bg-white p-2 font-sans">

      {loading ? (
  <Text>Loading products...</Text>
) : products.length === 0 ? (
  <Text>No products available at the moment.</Text>
) : (
  <FlatList
    data={products}
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderItem}
    contentContainerStyle={{ padding: 0 }}
  />
)}

      
      <StatusBar style="auto" />
      </View>
      
      <NavBar />
      </SafeAreaView>
    
    );
}