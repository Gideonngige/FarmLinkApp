import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import "../global.css";


export default function Profile() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [farmerId, setFarmerId] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      { label: 'Hindi', value: 'Hindi' },
      { label: 'Sabasaba', value: 'Sabasaba' },
      { label: 'Kiongoni', value: 'Kiongoni' },
      { label: 'Matengeni', value: 'Matengeni' },
      { label: 'Safirisi', value: 'Safirisi' },
    ]);

  useEffect(() => {
    const fetchData = async () => {
      const farmer_id = await AsyncStorage.getItem('farmer_id');
      const area_of_residence = await AsyncStorage.getItem('area_of_residence');
      const farmer_name = await AsyncStorage.getItem('farmer_name');
      const phone_number = await AsyncStorage.getItem('phone_number');
      const profile_image = await AsyncStorage.getItem('profile_image');
      setEmail(email);
      setFullname(farmer_name);
      setPhonenumber(phone_number);
      setFarmerId(farmer_id);
      setProfileImg(profile_image);
      setValue(area_of_residence);
    }
    fetchData();
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
      setSelectedImage(uri);
      setProfileImg(uri); // update preview
    }
  };

  const handleUpdate = async () => {
    if (fullname === "" || phonenumber === "" || value == null) {
      Alert.alert("Empty field", "Please fill all fields");

      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("farmer_id", farmerId);
      formData.append("farmer_name", fullname);
      formData.append("phone_number", phonenumber);
      formData.append("area_of_residence", value);

      if (selectedImage) {
        const filename = selectedImage.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("profile_image", {
          uri: selectedImage,
          name: filename,
          type,
        });
      }

      const response = await axios.post(
        "https://farmlinkbackend-qupt.onrender.com/updateprofile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data.message === "ok") {
        Alert.alert("Success", "Updated successfully");
      } else {
        Alert.alert("Error", "An error occurred");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
          <TouchableOpacity onPress={pickImage} className="items-center mb-4">
            <Image
              source={{ uri: profileImg }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                borderWidth: 3,
                borderColor: '#fff',
                resizeMode: 'cover',
              }}
            />
            <Text className="text-green-800 mt-2 underline font-lato">Change Photo</Text>
          </TouchableOpacity>

          <Text className="w-full text-lg font-bold font-lato text-green-800">Your full names</Text>
          <TextInput
            placeholder="e.g John Doe"
            value={fullname}
            onChangeText={setFullname}
            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-green-800 text-gray-400 text-lg font-lato"
          />

          <Text className="w-full text-lg font-bold font-lato text-green-800">Your phone number</Text>
          <TextInput
            placeholder="e.g 0712345678"
            value={phonenumber}
            onChangeText={setPhonenumber}
            keyboardType="phone-pad"
            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-green-800 text-gray-400 text-lg font-lato"
          />

          <Text className="w-full text-lg text-green-800 font-bold">Area of residence</Text>
          <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select area of residence"
          style={{borderColor: '#277230',borderWidth: 1, marginBottom:25  
          }}
          listMode="SCROLLVIEW"
          />

          <TouchableOpacity className="w-full bg-green-800 p-4 rounded-lg" onPress={handleUpdate}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg font-lato">Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}