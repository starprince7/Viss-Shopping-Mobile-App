import { Alert, Image, TouchableOpacity } from "react-native"
import tw from "twrnc"
import { useDispatch, useSelector } from "react-redux"

import { View, Text } from "./Themed"
import { CartItemType, increaseItemQty, decreaseItemQty } from "../redux/slices/cartSlice"
import HeaderIcon from "./HeaderIcon"
import { getSingleProduct } from "../utills/getProduct"
import { useCallback, useEffect, useState } from "react"
import Naira from "./FormatToNaira"

export default function CartItem(props: CartItemType) {
    const { _id, quantity } = props;
    
    const dispatch = useDispatch()
    const [product, setProduct] = useState<CartItemType | null>()

    const fetchProduct = useCallback(async () => {
        const { error, data } = await getSingleProduct(_id)
        data && setProduct(data)
    }, [_id])

    useEffect(() => {
        fetchProduct()
    }, [])

    const _increaseItemQty = () => {
        dispatch(increaseItemQty(props))
    }

    const _decreaseItemQty = () => {
        dispatch(decreaseItemQty({ _id }))
    }

    return (
        <View
            lightColor="white"
            darkColor="#72706E"
            style={tw`flex-row bg-transparent justify-between items-center mt-5 mx-2 pb-2 border-b border-gray-100 dark:border-b-0`}
        >
            <Image
                source={{ uri: `${product?.image}` }}
                style={tw`h-44 w-36 rounded-3xl`}
            />
            <View style={tw`bg-transparent mx-3`}>
                <Text style={tw`font-semibold text-lg max-w-49`}>{product?.title}</Text>
                {/* <Text style={tw`text-gray-300 mt-1 mb-3`}>{product?.description}</Text> */}
                <Text style={tw`text-lg font-bold`}>{ product?.price && (<Naira>{ product.price * quantity }</Naira>) } </Text>
                <View style={tw`flex-row bg-transparent justify-between items-center w-30 mt-1.5`}>
                    <TouchableOpacity
                        onPress={_decreaseItemQty}
                        style={tw`rounded-full bg-transparent border border-gray-200 dark:border-gray-600 px-2 py-1.5`}
                    >
                        <Text style={tw`font-bold text-xl`}>
                            <HeaderIcon customStyle={tw`text-black dark:text-white`} name="remove" />
                        </Text>
                    </TouchableOpacity>

                    <Text style={tw`mx-3`}>{quantity}</Text>

                    <TouchableOpacity
                        onPress={_increaseItemQty}
                        style={tw`rounded-full bg-transparent border border-gray-200 dark:border-gray-600 px-2 py-1.5`}
                    >
                        <Text style={tw`font-bold text-xl`}>
                            <HeaderIcon customStyle={tw`text-black dark:text-white`} name="add" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}