import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NavBar from './NavBar';
import "../global.css";

export default function ChatAI() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    const res = await fetch('https://payments-5rvq.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white mb-0">
    <View style={styles.container}>
      <TextInput
        placeholder="Ask Gemini something..."
        value={message}
        onChangeText={setMessage}
        style={styles.input}
        className='border-green-800'
      />
      <TouchableOpacity onPress={sendMessage} className="w-full bg-green-800 mt-4 mb-4 p-4 rounded-lg">
        {loading ? (
          <Text className="text-white text-center font-semibold text-lg">Asking Gemini...</Text>
        ) : <Text className="text-white text-center font-semibold text-lg">Ask Gemini</Text>}
        
      </TouchableOpacity>
      <ScrollView className='mb-10'>
        <Text style={styles.response}>{response}</Text>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
    <NavBar />
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 30, marginBottom:160 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  response: { marginTop: 20, fontSize: 16 }
});
