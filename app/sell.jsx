import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default function Sell(){
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Maize', value: 'Maize' },
    { label: 'Beans', value: 'Beans' },
    { label: 'Greengrams', value: 'Greengrams' },
    { label: 'Carrots', value: 'Carrots' },
    { label: 'Kales', value: 'Kales' },
  ]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  // Ask for permission on mount
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need permission to access your media library.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSell = () => {
    alert("Clicked sell button!");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView nestedScrollEnabled={true} className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
          <Text className="w-full font-bold mb-2">Product name</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select product name"
            style={{
              borderColor: '#277230',
              borderWidth: 1,
            }}
            listMode="SCROLLVIEW"
          />

          <Text className="w-full font-bold mt-4">Image</Text>
          <TouchableOpacity onPress={pickImage} className="w-full p-3 mt-2 bg-green-800 rounded">
            <Text className="text-white text-center">Pick Image</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200, marginTop: 10, borderRadius: 10 }}
            />
          )}

          <Text className="w-full font-bold mt-4">Description</Text>
          <TextInput
            className="border border-green-800 h-40 rounded p-2 w-full mt-2 mb-4"
            placeholder="Type your question here..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Text className="w-full font-bold mt-4">Quantity</Text>
          <TextInput
            placeholder="eg. 60"
            keyboardType="numeric"
            className="w-full p-4 bg-white rounded-lg shadow-sm mt-2 mb-4 border border-green-800 text-gray-400 text-lg"
          />

          <Text className="w-full font-bold mt-4">Price per unit(Ksh)</Text>
          <TextInput
            placeholder="eg. 100"
            keyboardType="numeric"
            className="w-full p-4 bg-white rounded-lg shadow-sm mt-2 mb-4 border border-green-800 text-gray-400 text-lg"
          />

          <TouchableOpacity className="w-full bg-green-800 mt-4 p-4 rounded-lg" onPress={handleSell}>
            {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">SELL</Text>}
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
