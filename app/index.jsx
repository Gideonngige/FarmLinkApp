import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from 'react-native-reanimated-carousel';

export default function Index() {  
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.99;

const data = [
  { title: 'Welcome to FarmLink', image: require('../assets/images2/tractor.png') },
  { title: 'Sell your carrots easily', image: require('../assets/images2/carrots.png') },
  { title: 'Sell your spinach easily', image: require('../assets/images2/spinach.png') },
  { title: 'Sell your onions easily', image: require('../assets/images2/onions.png') },
  { title: 'Sell your maize easily', image: require('../assets/images2/maize.png') },
  { title: 'Sell the test of blueberry', image: require('../assets/images2/blueberries.png') },
];
const renderItem = ({ item }) => (
  <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Carousel
        data={data}
        renderItem={renderItem}
        width={SLIDER_WIDTH}
        height={250}  // Adjust height as needed
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
      />

      <Text className="font-bold text-2xl font-lato">Sell, Buy, Discuss Farm Issues</Text>

      <Text className="mt-6 font-lato">Welcome to FarmLink App. Join other farmers, to sell and buy local farm products fresh from the farm. Discuss farm issues  with other farmers.</Text>

      <View className="mt-8 w-full">
        <TouchableOpacity className="bg-green-800 rounded-full" onPress={()=>router.push("/signup")}>
        <Text className="text-white text-center font-semibold text-lg font-lato p-4">Create new account</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-green-800 rounded-full mt-8" onPress={()=>{router.push("/signin")}}>
        <Text className="text-white text-center font-semibold text-lg font-lato p-4">I already have an account</Text>
      </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
    </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
});