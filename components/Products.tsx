import { Image, FlatList, TouchableOpacity } from "react-native"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"

import { View, Text } from "./Themed"


export default function Products() {
    const navigation = useNavigation()
    const data = [
        {
            key: 1,
            title: "Apple Watch Mini Smart 4",
            beforePrice: 200,
            price: 300,
            image: "../assets/images/sample-watch.jpeg"
        },
        {
            key: 2,
            title: "Apple Watch Mini Smart 3",
            beforePrice: 200,
            price: 300,
            image: "../assets/images/sample-watch.jpeg"
        },
        {
            key: 3,
            title: "Apple Watch Mini Smart 2",
            beforePrice: 200,
            price: 300,
            image: "../assets/images/sample-watch.jpeg"
        },
        {
            key: 4,
            title: "Apple Watch Mini Smart 1",
            beforePrice: 200,
            price: 300,
            image: "../assets/images/sample-watch.jpeg"
        },
        {
            key: 5,
            title: "Apple Watch Mini Smart 2",
            beforePrice: 200,
            price: 300,
            image: "../assets/images/sample-watch.jpeg"
        },
        {
            key: 6,
            title: "Apple Watch Mini Smart 1",
            beforePrice: 200,
            price: 300,
            image: "../assets/images/sample-watch.jpeg"
        },
        {
            key: 7,
            title: "Apple Watch Mini Smart 1",
            beforePrice: 200,
            price: 300,
            image: "../assets/images/sample-watch.jpeg"
        },
        {
            key: 8,
            title: "Apple Watch Mini Smart 1",
            beforePrice: 200,
            price: 300,
            image: "../assets/images/sample-watch.jpeg"
        },
    ]

    return (
        <View
            style={tw`p-5 flex-1 pb-15`}
            lightColor="#eee"
            darkColor="#1B1F22"
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductDetail')}
                        style={tw`mx-2 mb-5 flex-1 rounded-2xl w-[43%] shadow-sm`}
                    >
                        <View
                            lightColor="white"
                            darkColor="#72706E"
                            style={tw`rounded-2xl`}
                        >
                            <Image
                                style={tw`w-full h-33 rounded-t-2xl`}
                                source={require("../assets/images/sample-watch.jpeg")} />
                            <View
                                lightColor="white"
                                darkColor="#52525b"
                                style={tw`px-3 pt-1.5 rounded-b-2xl`}
                            >
                                <Text style={tw`font-semibold`}>{item.title}</Text>
                                <View style={tw`flex flex-row items-center bg-transparent py-0.5`}
                                >
                                    <Text style={tw`line-through mr-2 text-sm text-gray-300`}>${item.beforePrice}</Text>
                                    <Text style={tw`font-extrabold text-[#89A67E]`}>${item.price}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}