import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ChatAI = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    
    setIsLoading(true);
    try {
      const response = await axios.get("http://172.16.85.15:8000/ask_question/Which disease affect tomatoes/");
      if(response.status === 200){
        setMessage(response.data.answer);
        setInput('');
      }
      else{
        alert("Error in fetching data");
      }


    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <ScrollView>
        {/* {messages.map((msg, index) => (
          <Text key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{msg.role === 'user' ? 'You' : 'AI'}:</Text> {msg.content}
          </Text>
        ))} */}
        <Text>{message}</Text>
      </ScrollView>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type your message"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 }}
      />
     
      <TouchableOpacity onPress={sendMessage} className="bg-green-800 px-4 py-2 rounded items-center justify-center">
        { isLoading ? <Text className="text-white text-center font-semibold">sending...</Text> : <Text className="text-white text-center font-semibold">SEND</Text>}
      
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
    
  );
};

export default ChatAI;
