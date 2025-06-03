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
import { Ionicons } from "@expo/vector-icons";

export default function Replies() {
    const [reply, setReply] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
        
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
                            
                          </View>
                        
                        <ScrollView className="flex-1">
                          <Text className="w-full m-4 font-bold text-lg">Replies</Text>
                          <View className="bg-white m-2 rounded-lg shadow">
                            <View className="flex-row items-center p-4">
                              <Image
                                source={{ uri: "https://i.pravatar.cc/100" }}
                                className="w-10 h-10 rounded-full mr-4"
                              />
                              <View>
                                <Text className="font-bold">Jane Smith</Text>
                              </View>
                              <Text className="ml-auto text-gray-500">1h ago</Text>
                            </View>
                            <Text className="p-4 text-gray-800">
                              I agree, crop rotation is crucial. It helps prevent soil depletion and pest buildup.
                            </Text>
                            </View>
                            <View className="bg-white m-2 rounded-lg shadow">
                            <View className="flex-row items-center p-4">
                              <Image
                                source={{ uri: "https://i.pravatar.cc/100" }}
                                className="w-10 h-10 rounded-full mr-4"
                              />
                              <View>
                                <Text className="font-bold">Jane Smith</Text>
                              </View>
                              <Text className="ml-auto text-gray-500">1h ago</Text>
                            </View>
                            <Text className="p-4 text-gray-800">
                              I agree, crop rotation is crucial. It helps prevent soil depletion and pest buildup.
                            </Text>
                            </View>
                            <View className="bg-white m-2 rounded-lg shadow">
                            <View className="flex-row items-center p-4">
                              <Image
                                source={{ uri: "https://i.pravatar.cc/100" }}
                                className="w-10 h-10 rounded-full mr-4"
                              />
                              <View>
                                <Text className="font-bold">Jane Smith</Text>
                              </View>
                              <Text className="ml-auto text-gray-500">1h ago</Text>
                            </View>
                            <Text className="p-4 text-gray-800">
                              I agree, crop rotation is crucial. It helps prevent soil depletion and pest buildup.
                            </Text>
                            </View>
                            </ScrollView>

            {/* text input for reply */}
            {/* Input at Bottom */}
            <View className="flex-row items-center mb-0 p-3 border-t border-gray-200 bg-white">
          <TextInput
            value=""
            onChangeText=""
            placeholder="Type your reply..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 bg-white font-lato"
          />
          <TouchableOpacity
                className="p-2 bg-green-800 rounded-full"
                onPress=""
              >
                <Ionicons name="send" size={20} color="white" />
              </TouchableOpacity>
        </View>
            

        
      
    </SafeAreaView>
  );
}
