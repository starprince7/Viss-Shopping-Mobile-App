import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import tw from "twrnc"

import EditScreenInfo from '../components/EditScreenInfo';
import CartItem from '../components/CartItem';
import HeaderIcon from '../components/HeaderIcon';
import { Text, View } from '../components/Themed';
import { selectCartItems } from '../redux/slices/cartSlice';

export default function CartScreen() {
  const navigation = useNavigation()
  const cartItems = useSelector(selectCartItems)
  // console.log("Cart screen Items ", cartItems)

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
            style={tw`capitalize font-medium text-lg my-2`}
          >
            {/* Checkout */}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShippingInfo")}
          style={tw`px-0.5 py-1.5 rounded-[8px] bg-[#89A67E] absolute top-7.5 right-3 z-10 flex-row items-center`}>
          <Text style={tw`ml-2`}>Checkout</Text>
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
            {
              cartItems.length > 0
              ? (
                  cartItems.map(item =>
                    <CartItem {...item} />
                  )
                )
              :
              (<Text>You haven't bagged any item </Text>)
            }
          </ScrollView>
          {/* <FlatList
            data={cartItems}
            extraData={cartItems}
            // onRefresh={() => Alert.alert("refreshing...")}
            // refreshing={false}
            renderItem={({ item }) => <CartItem {...item} />}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
