import { FlatList, ScrollView } from "react-native"

import tw from "twrnc"
import { Text, View } from "./Themed"

export default function HomeHeader() {

    return (
        <View
            style={tw`pt-3 px-5`}
            lightColor="#eee"
            darkColor="#1B1F22"
        >
            <Text
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
                style={tw`font-extrabold text-3xl w-[80%]`}>Discover
            </Text>
            <Text
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
                style={tw`font-extrabold text-3xl w-[80%]`}>our new items
            </Text>
        </View>
    )
}