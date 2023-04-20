import tw from "twrnc"
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import { Alert, FlatList, Platform, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import sumCart, { getItemsQuantity } from '../utills/sumCart';
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import Naira from '../components/FormatToNaira';
import { Text, View } from '../components/Themed';
import { selectAuth } from '../store/slices/authSlice';
import { selectCartItems } from '../store/slices/cartSlice';
import EmptyShoppingBag from '../components/EmptyShoppingBag';

export default function CartScreen() {
  const navigation = useNavigation()
  const cartItems = useSelector(selectCartItems)
  const authenticatedCustomer = useSelector(selectAuth)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [numberOfItem, setNumberOfItem] = useState(0)

  // Calculation of total cart price
  useEffect(() => {
    const total = sumCart(cartItems)
    const items = getItemsQuantity(cartItems)

    setNumberOfItem(items)
    setTotalCartPrice(total)
  }, [cartItems])

  const handleCheckout = () => {
    // if there's no auth ID, push to login screen
    if (!authenticatedCustomer.customerId) {
      navigation.navigate("LoginScreen")
      return
    }
    navigation.navigate("ShippingInfo")
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <StatusBar style='auto' />
      <View
        lightColor="#eee"
        darkColor="#1B1F22"
        style={tw`flex-1 pt-8z`}
      >
        <View
          style={tw`rounded-[8px] bg-transparent absolute ${Platform.OS==='ios'?`top-8.5`:`top-11.5`} left-3 z-10`}>
          <Text style={tw`ml-2 text-neutral-400 text-xl uppercase font-bold`}>Your Bag</Text>
        </View>
        {
          cartItems.length > 0 &&
          (
            <TouchableOpacity
              onPress={handleCheckout}
              style={tw`px-0.5 py-2.5 rounded-[8px] bg-[#89A67E] absolute ${Platform.OS==='ios'?`top-7.5`:`top-10.5`} right-3 z-10 flex-row items-center`}>
              <Text style={tw`ml-2 text-xs text-white uppercase font-semibold`}>Proceed to Checkout</Text>
              <MaterialIcons size={15} name="arrow-forward" style={tw`text-white ml-0.5 px-1.5`} />
            </TouchableOpacity>
          )
        }

        {/* >>>>>>>>>>>>>>>> Cart Content View <<<<<<<<<<<<<<<< */}
        <View
          lightColor="white"
          darkColor="#3f3f46"
          style={tw`flex-1 mt-14.5 overflow-hidden rounded-t-3xl px-3 pb-20`}>
          {/* >>>>>>>>>>> Cart-Item <<<<<<<<<<<<<< */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <<< Show Cart Items OR Show `You have no item added` >>> */}
            {cartItems.length > 0 && (
              <Text
                lightColor='#d1d5db'
                darkColor='#6b7280'
                style={tw`text-center pt-3 font-bold text-lg`}
              >
                Selected {numberOfItem} items
              </Text>
            )}
            {
              cartItems.length > 0
                ? (
                  cartItems.map(item =>
                    <View style={tw`bg-transparent`} key={item._id}>
                      <CartItem {...item} />
                    </View>
                  )
                )
                :
                (<EmptyShoppingBag />)
            }
          </ScrollView>

          {/* ***** Item Total  Start ***** */}
          {
            cartItems.length > 0 && (
              <View style={tw`px-3 pt-2 pb-1 bg-transparent`}>
                <Text style={tw`font-semibold mb-1`}>Total :</Text>
                <Text style={tw`font-bold`}><Naira>{totalCartPrice}</Naira></Text>
              </View>
            )
          }
          {/* ***** Item Total  End ***** */}
        </View>
      </View>
    </SafeAreaView>
  );
}

