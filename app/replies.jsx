import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import "../global.css";
import { Ionicons } from "@expo/vector-icons";

export default function Replies() {
  const [reply, setReply] = useState("");
  const [repliesList, setRepliesList] = useState([
    {
      name: "Jane Smith",
      text: "I agree, crop rotation is key!",
      time: "1h ago",
    },
    {
      name: "Mike Johnson",
      text: "What crops do you recommend?",
      time: "30m ago",
    },
    {
      name: "Emily Davis",
      text: "I have had great success with legumes.",
      time: "5m ago",
    },
    {
      name: "Sarah Brown",
      text: "Rotation helps prevent pests too!",
      time: "5m ago",
    },
    {
      name: "Sarah Brown",
      text: "Rotation helps prevent pests too!",
      time: "5m ago",
    },
    {
      name: "Sarah Brown",
      text: "Rotation helps prevent pests too!",
      time: "5m ago",
    },
  ]);

  const handleSendReply = () => {
    if (reply.trim() !== "") {
      const newReply = {
        name: "You", // Or get the actual user's name
        text: reply.trim(),
        time: "Just now", // Dynamic time
      };
      setRepliesList([newReply, ...repliesList]); // Add new reply at the beginning
      setReply(""); // Clear input field
      Keyboard.dismiss(); // Dismiss keyboard after sending
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20} // Adjust offset as needed
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            
              {/* Main Post */}
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
                <View className="flex-row px-4 pb-2">
                  <TouchableOpacity className="mr-4">
                    <Text className="text-green-600 font-bold">
                      {repliesList.length} replies
                    </Text>
                  </TouchableOpacity>
                  {/* The original 'Reply' button here for the main post might be confusing if we have a global reply input. Consider its purpose. */}
                  <TouchableOpacity>
                    <Text className="text-green-600 font-bold">Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Reply Input Section - Moved Above Replies */}
              <View className="flex-row items-center px-4 py-2 border-b border-gray-200 bg-white">
                <TextInput
                  placeholder="Write your reply..."
                  value={reply}
                  onChangeText={setReply}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
                  multiline={true} // Allow multiple lines for longer replies
                  maxHeight={100} // Limit the height of the input
                />
                <TouchableOpacity
                  className="p-2 bg-green-600 rounded-full"
                  onPress={handleSendReply}
                >
                  <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
              </View>
              
              <ScrollView nestedScrollEnabled={true} className="p-4">
              {/* Replies */}
              <Text className="font-bold text-lg mx-2 mt-2">Replies</Text>
              {repliesList.map((replyItem, index) => (
                <View key={index} className="bg-white my-2 rounded-lg shadow">
                  <View className="flex-row items-center p-4">
                    <Image
                      source={{
                        uri: "https://i.pravatar.cc/100?img=" + (index + 1),
                      }}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <View>
                      <Text className="font-bold">{replyItem.name}</Text>
                      <Text className="text-gray-600">{replyItem.text}</Text>
                    </View>
                    <Text className="ml-auto text-gray-500">
                      {replyItem.time}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}