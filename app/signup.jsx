import axios from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from "react-native-toast-message";
import "../global.css";



export default function SignUp(){
    const router = useRouter();
    const [fullname,setFullname] = useState("");
    const [phonenumber,setPhonenumber] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Hindi', value: 'Hindi' },
      { label: 'Sabasaba', value: 'Sabasaba' },
      { label: 'Kiongoni', value: 'Kiongoni' },
      { label: 'Matengeni', value: 'Matengeni' },
      { label: 'Safirisi', value: 'Safirisi' },
    ]);

    //start of handle register
    const handleSignUp = async() => {
      if(fullname == "" || phonenumber == "" || email == "" || value == null || password == "" || confirmPassword == ""){
        Toast.show({
              type: "error", // Can be "success", "error", "info"
              text1: "Empty fields",
              text2: "Please fill in all fields",
              position:"center",
            });
        return;
      }
      else{
      if(password == confirmPassword){
        setIsLoading(true);
        try {
          const url = "https://farmlinkbackend-qupt.onrender.com/signup/";
          const data = {
              fullname: fullname,
              phonenumber: phonenumber,
              email: email,
              areaofresident: value,
              password: password,
          };
  
          const response = await axios.post(url, data, {
              headers: { "Content-Type": "application/json" },
          });
          if(response.status === 201){
            Toast.show({
              type: "success", // Can be "success", "error", "info"
              text1: "Signup successful",
              text2: "You can now sign in",
              position:"center",
            });
            router.push("signin/");
          }
          else{
            Toast.show({
              type: "error", // Can be "success", "error", "info"
              text1: "Failed signup",
              text2: response.data.message,
              position:"center",
            });
            // alert(response.data.message);
          }
  
      } 
      catch (error) {
          // console.error("Error during registration:", error);
  
          if (error.response) {
              // console.error("Server Error:", error.response.data);
              Toast.show({
                type: "error", // Can be "success", "error", "info"
                text1: "Error",
                text2: error.response.data.message,
                position:"center",
              });
              // alert("Server Error: " + JSON.stringify(error.response.data));
          } else {
              console.error("Network Error:", error.message);
              Toast.show({
                type: "error", // Can be "success", "error", "info"
                text1: "Network Error",
                text2: error.message,
                position:"center",
              });
              // alert("Network Error: " + error.message);
          }
      }
      finally{
        setIsLoading(false);
      }
    }
    else{
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Password mismatch",
        text2: "Password do not match",
        position:"center",
      });
      // alert("Passwords do not match");
    }
  }
  }
    // end of handle register

    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <Text className="text-xl text-green-800 font-bold">SignUp</Text>
    <View className="w-full">

        <Text className="w-full text-green-800 text-lg font-bold">Full names</Text>
      <TextInput 
      placeholder="eg. Gideon Ushindi"
      value={fullname}
      onChangeText={setFullname}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-green-800 text-gray-400 text-lg"
      />
      <Text className="w-full text-green-800 text-lg font-bold">Phone number</Text>
      <TextInput 
      placeholder="e.g. 0712345678"
      keyboardType="phone-pad"
      maxLength={10}
      value={phonenumber}
      onChangeText={setPhonenumber}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-green-800 text-gray-400 text-lg"
      />

    <Text className="w-full text-green-800 text-lg font-bold">Email</Text>
      <TextInput 
      placeholder="e.g.johndoe@example.com"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-green-800 text-gray-400 text-lg"
      />
    <Text className="text-lg text-green-800 font-bold">Area of residence</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select area of residence"
        style={{borderColor: '#277230',borderWidth: 1,  
        }}
        listMode="SCROLLVIEW"
      />
    </View>
      
      <Text className="w-full mt-6 text-green-800 text-lg font-bold">Password</Text>
      <TextInput 
      placeholder="********"
      secureTextEntry 
      value={password}
      onChangeText={setPassword}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-green-800 text-gray-400 text-lg"
      />
      <Text className="w-full text-green-800 text-lg font-bold">Confirm password</Text>
      <TextInput 
      placeholder="********"
      secureTextEntry 
      value={confirmPassword}
      onChangeText={setConfirmPassword}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-2 border border-green-800 text-gray-400 text-lg"
      />
      
      <TouchableOpacity className="w-full flex-row justify-end m-2" onPress={() => alert("Got to forgot password page")}>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-green-800 p-4 rounded-lg" onPress={handleSignUp}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">SignUp</Text>}
      </TouchableOpacity>
      <View className="flex-row justify-center mt-4">
      <Text className="text-lg">Already have an account? </Text>
      <TouchableOpacity onPress={() => router.push("/signin")}>
      <Text className="text-lg text-green-800">SignIn</Text>
      </TouchableOpacity>
      </View>
      <Toast/>
      <StatusBar style="auto" />
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}