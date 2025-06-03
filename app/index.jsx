import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import "../global.css";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function Index() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 bg-white shadow z-10">
          {/* Hamburger Button */}
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            <Ionicons name="menu" size={32} color="black" />
          </TouchableOpacity>

          {/* Profile Image */}
          <TouchableOpacity onPress={() => console.log("Profile tapped")}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              className="w-10 h-10 rounded-full"
            />
          </TouchableOpacity>
        </View>

        {/* Overlay Menu */}
        {menuOpen && (
          <View className="absolute top-16  w-full bg-green-600  p-4 z-20 shadow">
            
            <TouchableOpacity>
              <Text className="text-lg mb-2">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-lg mb-2">Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-lg">Settings</Text>
            </TouchableOpacity>
            
            
          </View>
        )}

        {/* Scrollable Main Content */}
        <ScrollView className="flex-1">
          {/* Welcome Section */}
          <View className="p-4 m-2 bg-green-600">
            <Text className="text-2xl font-bold text-white">
              Hi, Gideon Ushindi
            </Text>
            <Text className="text-lg mt-2 text-white">
              Buy, sell, and help other farmers
            </Text>
          </View>

          {/* Farm Products Section */}
          <View className="p-4">
            <Text className="text-xl font-bold mb-2">Farm Link Products</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              
                <TouchableOpacity className="bg-green-600 w-40 h-40 mr-4 rounded-lg items-center justify-center">
                  <Text className="text-white">Maize</Text>
                </TouchableOpacity>
              
                <TouchableOpacity className="bg-green-600 w-40 h-40 mr-4 rounded-lg items-center justify-center">
                  <Text className="text-white">Beans</Text>
                </TouchableOpacity>
               
                <TouchableOpacity className="bg-green-600 w-40 h-40 mr-4 rounded-lg items-center justify-center">
                  <Text className="text-white">Greengrams</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Trending Section */}
            <Text className="text-xl font-bold mt-2">Trending Farm Talks</Text>
            <ScrollView vertical showsHorizontalScrollIndicator={false} className="mt-2">
              <View className="bg-white m-2 rounded-lg shadow">
                <View className="flex-row items-center p-4">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/100" }}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <View>
                    <Text className="font-bold">John Doe</Text>
                    <Text className="text-gray-600">Discussing crop rotation</Text>
                  </View>
                  <Text className="ml-auto text-gray-500">2h ago</Text>
                </View>
                <Text className="p-4 text-gray-800">
                  Crop rotation is essential for maintaining soil health and
                  maximizing yield. Let's discuss the best practices.
                </Text>
                <View className="flex-row">
                  <TouchableOpacity className="px-4 py-2 rounded-full">
                    <Text className="text-green-600 font-bold">80 replies</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="px-4 py-2 rounded-full" onPress={() => router.push("/replies")}>
                    <Text className="text-green-600 font-bold">Reply</Text>
                  </TouchableOpacity>

                </View>
              </View>

              {/* items 2 */}
              <View className="bg-white m-2 rounded-lg shadow">
                <View className="flex-row items-center p-4">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/100" }}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <View>
                    <Text className="font-bold">John Doe</Text>
                    <Text className="text-gray-600">Discussing crop rotation</Text>
                  </View>
                  <Text className="ml-auto text-gray-500">2h ago</Text>
                </View>
                <Text className="p-4 text-gray-800">
                  Crop rotation is essential for maintaining soil health and
                  maximizing yield. Let's discuss the best practices.
                </Text>
                <View className="flex-row">
                  <TouchableOpacity className="px-4 py-2 rounded-full">
                    <Text className="text-green-600 font-bold">80 replies</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="px-4 py-2 rounded-full">
                    <Text className="text-green-600 font-bold">Reply</Text>
                  </TouchableOpacity>

                </View>
              </View>

              {/* item 3 */}
              <View className="bg-white m-2 rounded-lg shadow">
                <View className="flex-row items-center p-4">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/100" }}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <View>
                    <Text className="font-bold">John Doe</Text>
                    <Text className="text-gray-600">Discussing crop rotation</Text>
                  </View>
                  <Text className="ml-auto text-gray-500">2h ago</Text>
                </View>
                <Text className="p-4 text-gray-800">
                  Crop rotation is essential for maintaining soil health and
                  maximizing yield. Let's discuss the best practices.
                </Text>
                <View className="flex-row">
                  <TouchableOpacity className="px-4 py-2 rounded-full">
                    <Text className="text-green-600 font-bold">80 replies</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="px-4 py-2 rounded-full">
                    <Text className="text-green-600 font-bold">Reply</Text>
                  </TouchableOpacity>

                </View>
              </View>
              
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
