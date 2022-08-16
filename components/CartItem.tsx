import { Alert, Image, TouchableOpacity } from "react-native"
import tw from "twrnc"
import { useDispatch, useSelector } from "react-redux"

import { View, Text } from "./Themed"
import { CartItemType, increaseItemQty, decreaseItemQty } from "../redux/slices/cartSlice"
import HeaderIcon from "./HeaderIcon"

export default function CartItem({ title, quantity, description }: CartItemType) {
    const dispatch = useDispatch()

    const _increaseItemQty = () => {
        // dispatch(increaseItemQty({ key: 1 }))
        dispatch(increaseItemQty({ key: '2', quantity: 1, title: 'Apple Watch Mini 2', description: 'This amazine Apple watch mini 2' }))
        // Alert.alert("E work")
    }

    const _decreaseItemQty = () => {
        dispatch(decreaseItemQty({ key: 2 }))
    }
    return (
        <View
            lightColor="white"
            darkColor="#72706E"
            style={tw`flex-row bg-transparent justify-between items-center mt-5 mx-2 pb-2 border-b border-gray-100 dark:border-b-0`}
        >
            <Image
                source={require("../assets/images/sample-watch.jpeg")}
                style={tw`h-44 w-36 rounded-3xl`}
            />
            <View style={tw`bg-transparent mx-3`}>
                <Text style={tw`font-semibold text-lg`}>{title}</Text>
                <Text style={tw`text-gray-300 mt-1 mb-3`}>{description}</Text>
                <Text style={tw`text-lg font-bold`}>$200</Text>
                <View style={tw`flex-row bg-transparent justify-between items-center w-30 mt-1.5`}>
                    <TouchableOpacity
                        onPress={_decreaseItemQty}
                        style={tw`rounded-full bg-transparent border border-gray-200 dark:border-gray-600 px-2 py-1.5`}
                    >
                        <Text style={tw`font-bold text-xl`}>
                            <HeaderIcon customStyle={tw`text-white`} name="remove" />
                        </Text>
                    </TouchableOpacity>

                    <Text style={tw`mx-3`}>{quantity}</Text>

                    <TouchableOpacity
                        onPress={_increaseItemQty}
                        style={tw`rounded-full bg-transparent border border-gray-200 dark:border-gray-600 px-2 py-1.5`}
                    >
                        <Text style={tw`font-bold text-xl`}>
                            <HeaderIcon customStyle={tw`text-white`} name="add" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}