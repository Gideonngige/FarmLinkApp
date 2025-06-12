import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";


export default function Orders(){
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-2">
    <View className="flex-1 bg-white justify-center items-center font-sans">

        <View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
          <Image
            source={require('../assets/images2/beans.png')}
            className="h-40 w-40"
          />
        
          <View className="flex-1 p-4 justify-between bg-black/10">
            <View>
              <Text className="font-bold mb-2 text-green-800">BEANS</Text>
              <Text className="font-bold mb-2">
                Quantity: <Text className="text-green-800">2kg</Text>
              </Text>
              <Text className="font-bold mb-2">
                Price: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2">
                Paid: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2 text-green-800">07/12/2025 08:00 am</Text>
            </View>
          </View>
        </View>


        <View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
          <Image
            source={require('../assets/images2/spinach.png')}
            className="h-40 w-40"
          />
        
          <View className="flex-1 p-4 justify-between bg-black/10">
            <View>
              <Text className="font-bold mb-2 text-green-800">SPINACH</Text>
              <Text className="font-bold mb-2">
                Quantity: <Text className="text-green-800">2kg</Text>
              </Text>
              <Text className="font-bold mb-2">
                Price: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2">
                Paid: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2 text-green-800">07/12/2025 08:00 am</Text>
            </View>
          </View>
        </View>

        <View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
          <Image
            source={require('../assets/images2/carrots.png')}
            className="h-40 w-40"
          />
        
          <View className="flex-1 p-4 justify-between bg-black/10">
            <View>
              <Text className="font-bold mb-2 text-green-800">CARROTS</Text>
              <Text className="font-bold mb-2">
                Quantity: <Text className="text-green-800">2kg</Text>
              </Text>
              <Text className="font-bold mb-2">
                Price: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2">
                Paid: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2 text-green-800">07/12/2025 08:00 am</Text>
            </View>
          </View>
        </View>


        <View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
          <Image
            source={require('../assets/images2/onions.png')}
            className="h-40 w-40"
          />
        
          <View className="flex-1 p-4 justify-between bg-black/10">
            <View>
              <Text className="font-bold mb-2 text-green-800">ONIONS</Text>
              <Text className="font-bold mb-2">
                Quantity: <Text className="text-green-800">2kg</Text>
              </Text>
              <Text className="font-bold mb-2">
                Price: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2">
                Paid: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2 text-green-800">07/12/2025 08:00 am</Text>
            </View>
          </View>
        </View>


        <View className="flex-row mt-2 mx-4 rounded-lg overflow-hidden bg-white shadow">
          <Image
            source={require('../assets/images2/blueberries.png')}
            className="h-40 w-40"
          />
        
          <View className="flex-1 p-4 justify-between bg-black/10">
            <View>
              <Text className="font-bold mb-2 text-green-800">BLUEBERRIES</Text>
              <Text className="font-bold mb-2">
                Quantity: <Text className="text-green-800">2kg</Text>
              </Text>
              <Text className="font-bold mb-2">
                Price: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2">
                Paid: <Text className="text-green-800">Ksh.120</Text>
              </Text>
              <Text className="font-bold mb-2 text-green-800">07/12/2025 08:00 am</Text>
            </View>
          </View>
        </View>
        
      
      <StatusBar style="auto" />
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}