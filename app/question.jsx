import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";


export default function Question(){
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitQuestion = async () => {
        if(question.trim() === ""){
            Toast.show({
                type: "error", // Can be "success", "error", "info"
                text1: "Empty field",
                text2: "Please type your question",
                position:"center",
            });
            return;
        }
        const farmer_id = await AsyncStorage.getItem("farmer_id");
        setIsLoading(true);
        try{
        const response = await fetch('https://farmlinkbackend-qupt.onrender.com/question/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farmer_id: farmer_id,
          question_text: question,
        }),
      });
      const data = await response.json();
        if (response.status === 200) {
            Toast.show({
                type: "success", // Can be "success", "error", "info"
                text1: "Question submitted",
                text2: data.message,
                position:"center",
            });
            router.push("/"); // Redirect to home or any other page after submission
        }

        }
        catch(error){
            console.error("Error submitting question:", error);
        }
        finally {
            setIsLoading(false);
        }
    }
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        <Text className="w-full font-lato font-bold mb-4">Question</Text>
        <TextInput
        className="border border-gray-300 rounded p-2 h-40 w-full mb-4"
        placeholder="Type your question here..."
        value={question}
        onChangeText={setQuestion}
        multiline
        numberOfLines={4}
        />

        <TouchableOpacity
        className="bg-green-800 p-4 rounded-lg w-full"  
        onPress={handleSubmitQuestion}
        >
            {isLoading ? (
                <Text className="text-white text-center font-semibold text-lg">Submitting...</Text>
            ) : (
                <Text className="text-white text-center font-semibold text-lg">Submit Question</Text>
            )}
        </TouchableOpacity>
        <Toast/>
      
      <StatusBar style="auto" />
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}