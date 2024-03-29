import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import * as Haptics from "expo-haptics";
import tw from "twrnc";
import { Naira } from "react-native-naira"

import EditScreenInfo from "../components/EditScreenInfo";
import HeaderIcon from "../components/HeaderIcon";
import { Text, View } from "../components/Themed";
import { Product } from "../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  CartItemType,
  decreaseItemQty,
  getItemQuantityFromCart,
  increaseItemQty,
  selectCartItems,
} from "../store/slices/cartSlice";

export default function ProductDetailScreen() {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector(selectCartItems);
  const { height: windowHeight } = Dimensions.get("window")

  const item = route.params as CartItemType;
  const { image, description, title, price, _id } = route.params as Product;

  const quantity = getItemQuantityFromCart(cart, _id);

  // Object to dispatch to cart
  let product_item = { ...item, description: "null" };

  /* *** `AddToCart` or `Increase` Item Quantity *** */
  const increaseQty = (id: string) => {
    dispatch(increaseItemQty(product_item));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const decreaseQty = () => {
    /* ***
     * There's no need to dispatch the entire product again
     * since the product already exist inside the cart, hence
     * just update the quantity prop.
     * You need the ID field to find the item in the cart.
     */
    dispatch(decreaseItemQty({ _id }));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const addToCart = () => {
    dispatch(increaseItemQty(product_item));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View style={tw`flex-1 bg-gray-800 dark:bg-[#1B1F22]`} lightColor="#eee" darkColor="#1B1F22">
      {/* >>>>>>>>>>>>>>>>>>>>> Top Navigation Icons top <<<<<<<<<<<<<<<<<<<< */}
      <View
        style={tw`flex flex-row bg-transparent absolute left-2 z-50 ${
          Platform.OS === "ios" ? `mt-14` : `mt-10`
        } justify-between items-center`}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={tw`bg-white dark:bg-[#474644] shadow-xl p-2 rounded-full`}
        >
          <HeaderIcon
            customStyle={tw`text-black dark:text-white mx-auto`}
            name="arrow-back"
          />
        </Pressable>
      </View>
      {/* >>>>>>>>>>>>>>>>>>>>> Top Navigation Icons bottom <<<<<<<<<<<<<<<<<<<< */}
      <StatusBar style="auto" />
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`h-auto rounded-b-3xl z-10`}>
          <Image
            style={tw`w-full h-[${windowHeight/1.9}px] rounded-b-3xl`}
            source={{ uri: image }}
          />
        </View>
        <View
          style={tw`h-[${windowHeight/2}px] bg-gray-800 dark:bg-[#1B1F22] px-5 -mt-6 pt-14 pb-6 mb-15`}
        >
          <View style={tw`bg-transparent pt-2`}>
            <Text style={tw`font-semibold text-2xl w-64 text-white`}>
              {title}
            </Text>
            <View style={tw`bg-transparent flex flex-row items-center mt-3`}>
              {/* <Text style={tw`line-through mr-2 text-sm`}><Naira style={tw`text-gray-500`}>{ Number(3000) }</Naira></Text> */}
              <Text style={tw`text-xl`}>
                <Naira style={tw`text-[#89A67E]`}>{price}</Naira>
              </Text>
            </View>
          </View>
          {/* >>>> Quantity Button <<<<<<< */}
          <View
            style={tw`absolute right-8 top-13 bg-[#89A67E] py-1 w-10 rounded-3xl flex justify-center items-center`}
          >
            <TouchableOpacity onPress={() => increaseQty(_id)}>
              <Text style={tw`w-full py-2 px-3.5 text-white`}>+</Text>
            </TouchableOpacity>
            <Text style={tw`w-full py-1.5 text-center text-white`}>
              {quantity}
            </Text>
            <TouchableOpacity onPress={decreaseQty}>
              <Text style={tw`w-full py-2 px-3.5 text-white`}>-</Text>
            </TouchableOpacity>
          </View>
          {/* >>>> Quantity Button <<<<<<< */}
          <View style={tw`mt-10 bg-transparent`}>
            <Text style={tw`leading-5 text-gray-200`}>{description}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={addToCart}
        style={tw`px-5 py-4 absolute left-[25%] ${
          Platform.OS === "android" ? "bottom-4" : "bottom-8"
        } w-50 rounded-3xl bg-[#89A67E]`}
      >
        <Text style={tw`mx-auto text-white font-semibold`}>ADD TO BAG</Text>
      </TouchableOpacity>
    </View>
  );
}
