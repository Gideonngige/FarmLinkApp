import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ChatAI = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: newMessages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer your_api_key`,
          },
        }
      );

      const aiMessage = response.data.choices[0].message;
      setMessages([...newMessages, aiMessage]);
      setInput('');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <ScrollView>
        {messages.map((msg, index) => (
          <Text key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{msg.role === 'user' ? 'You' : 'AI'}:</Text> {msg.content}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type your message"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 }}
      />
     
      <TouchableOpacity onPress={sendMessage} className="bg-green-800 px-4 py-2 rounded items-center justify-center">
      <Text className="text-white text-center font-semibold">SEND</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
    
  );
};

export default ChatAI;
