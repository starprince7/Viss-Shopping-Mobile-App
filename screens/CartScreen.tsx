import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import tw from "twrnc"
import CartItem from '../components/CartItem';

import EditScreenInfo from '../components/EditScreenInfo';
import HeaderIcon from '../components/HeaderIcon';
import { Text, View } from '../components/Themed';

export default function CartScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={tw`flex-1`}>
      <StatusBar style='auto' />
      <View
        lightColor="#eee"
        darkColor="#1B1F22"
        style={tw`flex-1 pt-8`}
      >
        <View style={tw`flex-row justify-center items-center bg-transparent`}>
          <Text
            lightColor='black'
            darkColor='white'
            style={tw`capitalize font-medium text-lg`}
          >
            Check Out
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShippingInfo")}
          style={tw`px-0.5 py-1.5 rounded-[10px] bg-[#89A67E] absolute top-7.5 right-3 z-10 flex-row items-center`}>
          <HeaderIcon name="arrow-forward" customStyle={tw`text-white ml-0.5 px-1.5`} />
        </TouchableOpacity>
        {/* >>>>>>>>>>>>>>>> Cart Content View <<<<<<<<<<<<<<<< */}
        <View
          lightColor="white"
          darkColor="#3f3f46"
          style={tw`flex-1 mt-4.5 overflow-hidden rounded-t-3xl px-3 pb-20`}>
          {/* >>>>>>>>>>> Cart-Item <<<<<<<<<<<<<< */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <<< Show Cart Items OR Show `You have no item added` >>> */}
            <Text
              lightColor='#d1d5db'
              darkColor='#6b7280'
              style={tw`capitalize text-center pt-3 font-bold text-lg`}
            >
              Selected Items
            </Text>
            <CartItem />
            <CartItem />
            <CartItem />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

