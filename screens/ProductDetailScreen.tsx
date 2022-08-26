import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, Pressable, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import * as Haptics from "expo-haptics"
import tw from "twrnc"

import EditScreenInfo from '../components/EditScreenInfo';
import HeaderIcon from '../components/HeaderIcon';
import { Text, View } from '../components/Themed';
import { Product } from '../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseItemQty, getItemQuantityFromCart, increaseItemQty, selectCartItems } from '../redux/slices/cartSlice';


export default function ProductDetailScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const cart = useSelector(selectCartItems)

    const { image, description, title, price, _id } = route.params as Product

    const quantity = getItemQuantityFromCart(cart, _id)

    /* *** `AddToCart` or `Increase` Item Quantity *** */
    const increaseQty = (id: string) => {
        dispatch(increaseItemQty({ id, price }))
    }

    const decreaseQty = () => {
        dispatch(decreaseItemQty({ id: _id }))
    }

    const addToCart = () => {
        dispatch(increaseItemQty({ id: _id, price }))
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }

    return (
        <View
            style={tw`flex-1`}
            lightColor="#eee"
            darkColor="#1B1F22"
        >
            {/* >>>>>>>>>>>>>>>>>>>>> Top Navigation Icons top <<<<<<<<<<<<<<<<<<<< */}
            <View style={tw`flex flex-row bg-transparent px-5 z-50 mt-15 justify-between items-center`}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={tw`bg-white dark:bg-[#474644] shadow-xl p-2.5 rounded-full`}
                >
                    <HeaderIcon customStyle={tw`text-black dark:text-white mx-auto`} name='arrow-back' />
                </Pressable>
            </View>
            {/* >>>>>>>>>>>>>>>>>>>>> Top Navigation Icons bottom <<<<<<<<<<<<<<<<<<<< */}
            <StatusBar barStyle={'dark-content'} />
            <View style={tw`h-[51.8%] rounded-b-3xl absolute z-10 top-0 left-0 right-0`}>
                <Image
                    style={tw`w-full h-full rounded-b-3xl`}
                    source={{ uri: image }}
                />
            </View>
            <View style={tw`h-[52%] bg-gray-800 dark:bg-[#1B1F22] absolute bottom-0 left-0 right-0 px-5 pt-12`}>
                <View
                    style={tw`bg-transparent pt-2`}
                >
                    <Text style={tw`font-semibold text-2xl w-64 text-white`}>{title}</Text>
                    <View
                        style={tw`bg-transparent flex flex-row items-center mt-3`}
                    >
                        <Text style={tw`line-through mr-2 text-sm text-gray-300`}>$300</Text>
                        <Text style={tw`text-xl text-[#89A67E]`}>${price}</Text>
                    </View>
                </View>
                {/* >>>> Quantity Button <<<<<<< */}
                <View
                    style={tw`absolute right-8 top-13 bg-[#89A67E] py-1 w-10 rounded-3xl flex justify-center items-center`}>
                    <TouchableOpacity onPress={() => increaseQty(_id)}><Text style={tw`w-full py-2 px-3.5 text-white`}>+</Text></TouchableOpacity>
                    <Text style={tw`w-full py-1.5 text-center text-white`}>{quantity}</Text>
                    <TouchableOpacity onPress={decreaseQty}><Text style={tw`w-full py-2 px-3.5 text-white`}>-</Text></TouchableOpacity>
                </View>
                {/* >>>> Quantity Button <<<<<<< */}
                <View style={tw`mt-10 bg-transparent`}>
                    <ScrollView>
                        <Text style={tw`leading-5 text-gray-200`}>
                            {description}
                        </Text>
                    </ScrollView>
                </View>
                <TouchableOpacity
                    onPress={addToCart}
                    style={tw`px-5 py-4 absolute left-[25%] bottom-9 w-50 rounded-3xl bg-[#89A67E]`}
                >
                    <Text style={tw`mx-auto text-white`}>ADD TO CART</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

