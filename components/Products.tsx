import { Image, FlatList, TouchableOpacity } from "react-native"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"
import Naira from "./FormatToNaira"

import { View, Text } from "./Themed"
import { useSelector } from "react-redux"
import { selectProducts } from "../redux/slices/productSlice"


type ProductsProps = {
    fetchProducts: () => Promise<void>
}

export default function Products({ fetchProducts }: ProductsProps) {
    const navigation = useNavigation()
    const products = useSelector(selectProducts)

    return (
        <View
            style={tw`p-5 flex-1 pb-15`}
            lightColor="#eee"
            darkColor="#1B1F22"
        >
            {
                products.length === 0
                    ? (
                        <TouchableOpacity
                            onPress={fetchProducts}
                            style={tw`px-0.5 py-0.5 rounded-[8px] bg-[#89A67E]  z-10 flex-row items-center`}
                        >
                            <Text style={tw`text-gray-100 font-bold mx-auto p-3.6`}>Reload</Text>
                        </TouchableOpacity>
                    )
                    : (
                        <FlatList
                            numColumns={2}
                            data={products}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProductDetail', item)}
                                    style={tw`mx-2 mb-5 flex-1 rounded-2xl w-[43%] shadow-sm`}
                                >
                                    <View
                                        lightColor="white"
                                        darkColor="#72706E"
                                        style={tw`rounded-2xl`}
                                    >
                                        <Image
                                            style={tw`w-full h-33 rounded-t-2xl`}
                                            // source={require("../assets/images/sample-watch.jpeg")} />
                                            source={{ uri: `${item.image}` }} />
                                        <View
                                            lightColor="white"
                                            darkColor="#52525b"
                                            style={tw`px-3 pt-1.5 rounded-b-2xl`}
                                        >
                                            <Text style={tw`font-semibold`}>{item.title}</Text>
                                            <View style={tw`flex flex-row items-center bg-transparent py-0.5`}
                                            >
                                                {/* <Text style={tw`line-through mr-2 text-sm text-gray-300`}>$0.00{item.beforePrice}</Text> */}
                                                <Text style={tw`font-extrabold text-[#89A67E]`}>
                                                    {item.price && <Naira style={tw`text-[#89A67E]`}>{item.price}</Naira>}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )
            }
        </View>
    )
}