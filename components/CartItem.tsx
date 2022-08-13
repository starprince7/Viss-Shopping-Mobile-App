import { Image } from "react-native"
import tw from "twrnc"
import { View, Text } from "./Themed"

export default function CartItem() {
    return (
        <View
            lightColor="white"
            darkColor="#72706E"
            style={tw`flex-row bg-transparent justify-between items-center mt-5 mx-2 pb-2 border-b border-gray-100 dark:border-b-0`}
        >
            <Image
                source={require("../assets/images/sample-watch.jpeg")}
                style={tw`h-44 w-38 rounded-3xl`}
            />
            <View style={tw`bg-transparent`}>
                <Text style={tw`font-semibold text-lg`}>Apple Watch Mini 2</Text>
                <Text style={tw`text-gray-300 mt-1 mb-3`}>Apple Watch Mini 2</Text>
                <Text style={tw`text-lg font-bold`}>$200</Text>
                <View style={tw`flex-row bg-transparent justify-between items-center w-30 mt-1.5`}>
                    <View style={tw`rounded-full bg-transparent border border-gray-200 dark:border-gray-600 px-3.5 py-1.5`}><Text style={tw`font-bold text-xl`}>-</Text></View>
                    <Text>1</Text>
                    <View style={tw`rounded-full bg-transparent border border-gray-200 dark:border-gray-600 px-3.5 py-1.5`}><Text style={tw`font-bold text-xl`}>+</Text></View>
                </View>
            </View>
        </View>
    )
}