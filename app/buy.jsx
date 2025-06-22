import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Buy() {
    const [quantity, setQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(0);
    const [farmerEmail, setFarmerEmail] = useState("");
    const [farmerName, setFarmerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [farmerId, setFarmerId] = useState(0);
    const [productId, setProductId] = useState("");
    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState(0);
    const [productName, setProductName] = useState("Product name")
    const [cost, setCost] = useState(0);
    const [sellerId, setSellerId] = useState(0);

    // fetching data
    useEffect(() => {
    const fetchData = async () => {
      const farmer_email = await AsyncStorage.getItem("farmer_email");
      const farmer_name = await AsyncStorage.getItem("farmer_name");
      const phone_number = await AsyncStorage.getItem("phone_number");
      const product_id = await AsyncStorage.getItem("product_id");
      const farmer_id = await AsyncStorage.getItem("farmer_id");
      const seller_id = await AsyncStorage.getItem("seller_id");
      const price = await AsyncStorage.getItem("price");
      const available = await AsyncStorage.getItem("available");
      const product_name = await AsyncStorage.getItem("product_name");

      setFarmerEmail(farmer_email);
      setFarmerName(farmer_name);
      setPhoneNumber(phone_number);
      setProductId(product_id);
      setFarmerId(farmer_id);
      setPrice(price);
      setAvailable(available);
      setProductName(product_name);
      setSellerId(seller_id);

      
    };

    fetchData();
  }, []);

  useEffect(() => {
  setCost(price * quantity);
}, [price, quantity]);

// buy product function
const buyProduct=async()=>{
  const available2 = parseInt(available);
  if(quantity < 1){
    alert("Enter a valid quantity");
  }
  else if(quantity > available2){
    alert("The quantity is greater than available amount!")
  }
  else{
    setIsLoading(true);
  try{
    const response = await fetch('https://payments-5rvq.onrender.com/api/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone:"254797655727",
          amount: parseInt(cost),
          sellerId: sellerId,
          farmerId: farmerId,
          productId: productId,
          quantity: quantity,
        }),
      });
      
      const data = await response.json();
      if(response.status === 200){
        const response2 = await fetch('https://farmlinkbackend-qupt.onrender.com/buy/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sellerId: sellerId,
          farmerId: farmerId,
          productId: productId,
          quantity: quantity,
          amount: parseInt(cost),
          
        }),
      });
      if(response2.status === 200){
        alert("Payment was successfully");
        setQuantity("");

      }
        
      }
      else{
        alert("Payment was not successfully!");
      }

  }
  catch(error){
    alert("Error buying product");
  }
  finally{
    setIsLoading(false);
  }
}
}
  
  return (
    <SafeAreaView className="flex-1 bg-white pt-10">
      <ScrollView className="px-4">
        <View className="bg-white rounded-2xl shadow-md p-6 mb-6 mt-4">
            <Text>{productName}</Text>
            <Text>Available: {available}kg</Text>
            <Text>Cost: Ksh.{price} X {quantity} = Ksh. {cost}</Text>
            <TextInput
            placeholder="Enter quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            className="border border-green-800 text-gray-900 mt-4 bg-white p-4 rounded-lg text-lg font-lato mb-6"
          />

          <TouchableOpacity
            className="bg-green-800 rounded-xl p-4"
            onPress={buyProduct}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg font-lato">
                Proceed to Payment
              </Text>
            )}
          </TouchableOpacity>
        

        </View>
      </ScrollView>
      <Toast />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}