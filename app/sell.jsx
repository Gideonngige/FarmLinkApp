import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export default function Sell() {
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
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera roll permissions are required.');
      }
    })();
  }, []);

    // Pick an image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
    }
  };


  const handleSell = async () => {
    const farmer_id = await AsyncStorage.getItem("farmer_id");


    if (!value || !description || !quantity || !price || !imageUri) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('farmer_id', farmer_id);
    formData.append('product_name', value);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('price', price);
    if (imageUri) {
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("product_image", {
          uri: imageUri,
          name: filename,
          type,
        });
      }

    setIsLoading(true);
    try {
      const res = await axios.post('https://farmlinkbackend-qupt.onrender.com/sell_product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product added successfully!');
      setValue(null);
      setDescription('');
      setPrice('');
      setQuantity('');
      setImageUri(null);
    } catch (err) {
      alert('Failed to add product. Check your connection or try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView nestedScrollEnabled={true} className="p-4">
        <View className="flex-1 justify-center items-center p-5">
          <Text className="w-full font-bold mb-2">Product Name</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select product name"
            style={{ borderColor: '#277230', borderWidth: 1 }}
            dropDownContainerStyle={{ borderColor: '#277230' }}
            zIndex={1000}
            zIndexInverse={3000}
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
            placeholder="Type product description..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Text className="w-full font-bold mt-4">Quantity</Text>
          <TextInput
            placeholder="e.g. 60"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            className="w-full p-4 bg-white rounded-lg shadow-sm mt-2 mb-4 border border-green-800 text-gray-800 text-lg"
          />

          <Text className="w-full font-bold mt-4">Price per Unit (Ksh)</Text>
          <TextInput
            placeholder="e.g. 100"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            className="w-full p-4 bg-white rounded-lg shadow-sm mt-2 mb-4 border border-green-800 text-gray-800 text-lg"
          />

          <TouchableOpacity className="w-full bg-green-800 mt-4 p-4 rounded-lg" onPress={handleSell}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">SELL</Text>
            )}
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
