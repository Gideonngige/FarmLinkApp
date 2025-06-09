import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../global.css";


export default function Home() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [farmerName, setFarmerName] = useState("");
  const [farmerEmail, setFarmerEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [areaOfResidence, setAreaOfResidence] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  // function to fetch farmer data from signin
  useEffect(() => {
    const fetchFarmerData = async () => {
      const farmer_name = await AsyncStorage.getItem("farmer_name");
      const farmer_email = await AsyncStorage.getItem("farmer_email");
      const phone_number = await AsyncStorage.getItem("phone_number");
      const area_of_residence = await AsyncStorage.getItem("area_of_residence");
      const profile_image = await AsyncStorage.getItem("profile_image");
      const date_joined = await AsyncStorage.getItem("date_joined");
      setFarmerName(farmer_name || "Gideon Ushindi");
      setFarmerEmail(farmer_email);
      setPhoneNumber(phone_number || "0700000000");
      setAreaOfResidence(area_of_residence || "Kiongoni");
      setProfileImage(profile_image || "https://i.pravatar.cc/100");
      setDateJoined(date_joined || "2023-01-01");
      
    };

    fetchFarmerData();
  }
  , []);


  // function to fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://farmlinkbackend-qupt.onrender.com/get_questions/');
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions || []);
        } else {
          console.error("Failed to fetch questions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }
  , []);

  // Function to handle reply button click
  const handleReply = async (questionId, question_text, farmer_name, profile_image, created_at) => {
    try {
      await AsyncStorage.setItem("question_id", questionId.toString());
      await AsyncStorage.setItem("question_text", question_text);
      await AsyncStorage.setItem("farmer_name", farmer_name);
      await AsyncStorage.setItem("profile_image", profile_image);
      await AsyncStorage.setItem("created_at", created_at);
      router.push("/replies");
    } catch (error) {
      console.error("Error setting question ID:", error);
    }
  };

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
              source={{ uri: profileImage }}
              className="w-10 h-10 rounded-full"
            />
          </TouchableOpacity>
        </View>

        {/* Overlay Menu */}
        {menuOpen && (
          <View className="absolute top-16  w-full bg-green-800  p-4 z-20 shadow">
            
            <TouchableOpacity className="mt-4 bg-white p-2 rounded-lg">
              <Text className="text-lg mb-2">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/signin")} className="mt-4 bg-white p-2 rounded-lg">
              <Text className="text-lg">SignIn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/signup")} className="mt-4 bg-white p-2 rounded-lg">
              <Text className="text-lg">SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/question")} className="mt-4 bg-white p-2 rounded-lg">
              <Text className="text-lg">Ask Question</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/signup")} className="mt-4 bg-white p-2 rounded-lg">
              <Text className="text-lg">Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/question")} className="mt-4 bg-white p-2 rounded-lg">
              <Text className="text-lg">Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/chatai")} className="mt-4 bg-white p-2 rounded-lg">
              <Text className="text-lg">Chat AI</Text>
            </TouchableOpacity>
            
            
          </View>
        )}

        {/* Scrollable Main Content */}
        <ScrollView className="flex-1">
          {/* Welcome Section */}
          <View className="p-4 m-2 bg-green-800">
            <Text className="text-2xl font-bold text-white">
              Hi, {farmerName || "Welcome, Farmer!"}
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
              
                <TouchableOpacity className="bg-green-800 w-40 h-40 mr-4 rounded-lg items-center justify-center">
                  <Text className="text-white">Maize</Text>
                </TouchableOpacity>
              
                <TouchableOpacity className="bg-green-800 w-40 h-40 mr-4 rounded-lg items-center justify-center">
                  <Text className="text-white">Beans</Text>
                </TouchableOpacity>
               
                <TouchableOpacity className="bg-green-800 w-40 h-40 mr-4 rounded-lg items-center justify-center">
                  <Text className="text-white">Greengrams</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-green-800 w-40 h-40 mr-4 rounded-lg items-center justify-center">
                  <Text className="text-white">Kales</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Trending Section */}
            <Text className="text-xl font-bold mt-2">Trending Farm Talks</Text>
            <ScrollView vertical showsHorizontalScrollIndicator={false} className="mt-2">
            <FlatList
              data={questions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="bg-white m-2 rounded-lg shadow">
                <View className="flex-row items-center p-4">
                  <Image
                    source={{ uri: item.profile_image || "https://i.pravatar.cc/100" }}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <View>
                    <Text className="font-bold">{item.farmer_name}</Text>
                  </View>
                  <Text className="ml-auto text-gray-500">{item.created_at}</Text>
                </View>
                <Text className="p-4 text-gray-800">{item.question_text}</Text>
                <View className="flex-row justify-between items-center px-4">
                  <TouchableOpacity className="px-4 py-2 rounded-full">
                    <Text className="text-green-800 font-bold">80 replies</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="px-4 py-2 rounded-full" onPress={() => {handleReply(item.id, item.question_text, item.farmer_name, item.profile_image, item.created_at)}}>
                    <Text className="text-green-800 font-bold">Reply</Text>
                  </TouchableOpacity>

                </View>
              </View>
              )}
              ListEmptyComponent={
                <Text className="text-center text-gray-500">No talks available</Text>
              }
            />
              
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
