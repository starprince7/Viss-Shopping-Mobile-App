import { View, Text } from "./Themed"
import tw from "twrnc"
import { MaterialIcons } from "@expo/vector-icons"
import HeaderIcon from "./HeaderIcon"

export default function EmptyShoppingBag() {
    return (
        <View
            lightColor="white"
            darkColor="#3f3f46"
            style={tw`flex-1`}
        >
            <View style={tw`flex justify-center items-center bg-transparent flex-1 pt-36`}>
                <Text style={tw`font-semibold text-gray-300 text-lg dark:text-gray-500`}>Baggage is empty!</Text>
                <MaterialIcons name="shopping-bag" size={200} style={tw`text-gray-200 dark:text-gray-500 my-5`} />
            </View>
        </View>
    )
}