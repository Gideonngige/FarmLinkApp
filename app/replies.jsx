import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import NavBar from "./NavBar";

export default function Replies() {
    const [reply, setReply] = useState("");
    const [questionId, setQuestionId] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [farmerName, setFarmerName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [replies, setReplies] = useState("");
    const [isLoadingReplies, setIsLoadingReplies] = useState(false)

    // fetch farmer data from AsyncStorage
    useEffect(() => {
      const fetchFarmerData = async () => {
        const question_id = await AsyncStorage.getItem("question_id");
        const question_text = await AsyncStorage.getItem("question_text");
        const farmer_name = await AsyncStorage.getItem("farmer_name_r");
        const profile_image = await AsyncStorage.getItem("profile_image_r");
        const created_at = await AsyncStorage.getItem("created_at");

        setQuestionId(question_id || "");
        setQuestionText(question_text || "");
        setFarmerName(farmer_name || "Gideon Ushindi");
        setProfileImage(profile_image || "https://i.pravatar.cc/100");
        setCreatedAt(created_at || "2023-01-01");

      }
      fetchFarmerData();

    },[]);

    

    // function to handle reply
    const handelReply = async()=>{
      if(reply === ""){alert("Empty reply not allowed!");}
      const farmer_id = await AsyncStorage.getItem("farmer_id");
      try{
        const response = await fetch('https://farmlinkbackend-qupt.onrender.com/reply/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farmer_id: farmer_id,
          question_id: questionId,
          reply_text: reply,
        }),
      });
      
      const data = await response.json();
      if(response.status === 200){
        Toast.show({
            type: "success", // Can be "success", "error", "info"
            text1: "Reply sent",
            text2: data.message,
        });
        setReply("");

      }
      else{
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "Reply not sent",
          text2: data.message,
        });
      }

      }
      catch(error){
        alert(error);
      }
    }

  
  // function to fetch replies from the backend
    useEffect(() => {
  const fetchReplies = async () => {
    if (!questionId) return; // skip if questionId isn't ready

    setIsLoadingReplies(true);
    try {
      const response = await fetch(`https://farmlinkbackend-qupt.onrender.com/get_replies/${questionId}`);
      if (response.ok) {
        const data = await response.json();
        setReplies(data.replies || []);
      } else {
        console.error("Failed to fetch replies:", response.status);
      }
    } catch (error) {
      console.error("Error fetching replies:", error);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  fetchReplies();
}, [questionId]); // Only run when questionId is set

  


  return (
    <SafeAreaView className="flex-1 bg-white mb-10">
        
            <View className="bg-white m-2 rounded-lg shadow">
                            <View className="flex-row items-center p-4">
                              <Image
                                source={{ uri: profileImage }}
                                className="w-10 h-10 rounded-full mr-4"
                              />
                              <View>
                                <Text className="font-bold">{farmerName}</Text>
                              </View>
                              <Text className="ml-auto text-gray-500">{createdAt}</Text>
                            </View>
                            <Text className="p-4 text-gray-800">{questionText}</Text>
                            
                          </View>
                        
                        
                          <Text className="w-full m-4 font-bold text-lg">Replies</Text>

                          <FlatList
                              data={replies}
                              keyExtractor={(item) => item.id.toString()}
                              renderItem={({ item }) => (
                            <View className="bg-white m-2 rounded-lg shadow">
                            <View className="flex-row items-center p-2">
                              <Image
                                source={{ uri: item.profile_image }}
                                className="w-10 h-10 rounded-full mr-4"
                              />
                              <View>
                                <Text className="font-bold">{item.farmer_name}</Text>
                              </View>
                              <Text className="ml-auto text-gray-500">{item.created_at}</Text>
                            </View>
                            <Text className="p-2 text-gray-800">{item.reply_text}</Text>
                            </View>
                            )}
                            ListEmptyComponent={
                            <Text className="text-center text-gray-500">No replies available</Text>
                            }
                            />      
            

            {/* text input for reply */}
            {/* Input at Bottom */}
            <View className="flex-row items-center mb-0 p-3 border-t border-gray-200 bg-white">
          <TextInput
            value={reply}
            onChangeText={setReply}
            placeholder="Type your reply..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 bg-white font-lato"
          />
          <TouchableOpacity
                className="p-2 bg-green-800 rounded-full"
                onPress={handelReply}
              >
                <Ionicons name="send" size={20} color="white" />
              </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
        <Toast/>
            

        
      <NavBar />
    </SafeAreaView>
  );
}
