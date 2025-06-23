import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function NavBar() {
  const [activeRoute, setActiveRoute] = useState('home');
  const navigation = useNavigation();

  const handleOrders = async() => {
    const selected_chama = await AsyncStorage.getItem('selected_chama');
    if(selected_chama == "No Chama"){alert("You must join a chama first")}
    else{
      setActiveRoute('orders');
      navigation.navigate('orders');

    }
    
  };

  const handleProfile = async() => {
    const selected_chama = await AsyncStorage.getItem('selected_chama');
    if(selected_chama == "No Chama"){alert("You must join a chama first")}
    else{
      setActiveRoute('profile');
      navigation.navigate('profile');

    }
    
  };

  const handleChatAI = async() => {
    const selected_chama = await AsyncStorage.getItem('selected_chama');
    if(selected_chama == "No Chama"){alert("You must join a chama first")}
    else{
      setActiveRoute('chatai');
      navigation.navigate('chatai');

    }
    
  };

  const handleHome = () => {
    setActiveRoute('home');
    navigation.navigate('home'); // You can replace this with your actual home navigation logic
  };

  const handlePlacedOrders = async() => {
    setActiveRoute('placedorders');
    navigation.navigate('placedorders'); // You can replace this with your actual placed orders navigation logic

  }

  return (
    <View className="absolute bottom-4 left-4 right-4 bg-green-800 rounded-lg px-6 py-3 shadow-lg shadow-black/20 mb-0">
      <View className="flex-row justify-between items-center">
        {/* Home */}
        <TouchableOpacity onPress={handleHome} className="items-center flex-1">
          <MaterialCommunityIcons
            name={activeRoute === 'home' ? 'home' : 'home-outline'}
            size={28}
            color={activeRoute === 'home' ? 'black' : 'white'}
          />
          <Text className={`text-xs mt-1 ${activeRoute === 'home' ? 'text-black font-bold' : 'text-white'}`}>Home</Text>
        </TouchableOpacity>


        {/* Orders */}
        <TouchableOpacity onPress={handleOrders} className="items-center flex-1">
          <MaterialCommunityIcons
            name={activeRoute === 'orders' ? 'cart' : 'cart-outline'}
            size={28}
            color={activeRoute === 'orders' ? 'black' : 'white'}
          />
          <Text className={`text-xs mt-1 ${activeRoute === 'notifications' ? 'text-black font-bold' : 'text-white'}`}>
            Orders
          </Text>
        </TouchableOpacity>


        {/* PlacedOrders */}
        <TouchableOpacity onPress={handlePlacedOrders} className="items-center flex-1">
          <MaterialCommunityIcons
            name={activeRoute === 'placedorders' ? 'bag-personal' : 'bag-personal-outline'}
            size={28}
            color={activeRoute === 'placedorders' ? 'black' : 'white'}
          />
          <Text className={`text-xs mt-1 ${activeRoute === 'notifications' ? 'text-black font-bold' : 'text-white'}`}>
            Placed
          </Text>
        </TouchableOpacity>

        {/* ChatAI */}
        <TouchableOpacity onPress={handleChatAI} className="items-center flex-1">
          <MaterialCommunityIcons
            name={activeRoute === 'chatai' ? 'chat-processing-outline' : 'chat-processing-outline'}
            size={28}
            color={activeRoute === 'chatai' ? 'black' : 'white'}
          />
          <Text className={`text-xs mt-1 ${activeRoute === 'chatai' ? 'text-black font-bold' : 'text-white'}`}>
            Chat AI
          </Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity onPress={handleProfile} className="items-center flex-1">
          <MaterialCommunityIcons
            name={activeRoute === 'profile' ? 'account' : 'account-outline'}
            size={28}
            color={activeRoute === 'profile' ? 'black' : 'white'}
          />
          <Text className={`text-xs mt-1 ${activeRoute === 'profile' ? 'text-black font-bold' : 'text-white'}`}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}