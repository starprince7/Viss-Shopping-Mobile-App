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
                style={tw`font-bold text-4xl w-[80%]`}>Discover</Text>
            <Text
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
                style={tw`font-bold text-4xl w-[80%]`}>our new items</Text>
            <ScrollView horizontal style={tw`h-10 mt-3`} showsHorizontalScrollIndicator={false} >
                <View
                    lightColor="#89A67E"
                    darkColor="#89A67E"
                    style={tw`px-3 rounded-xl flex justify-center items-center mr-2`}
                >
                    <Text
                        lightColor="black"
                        style={tw` font-semibold text-lg text-white`}>Trending now</Text></View>
                
                <View
                    lightColor="white"
                    darkColor="#52525b"
                    style={tw`px-3 rounded-xl flex justify-center items-center mr-2`}
                ><Text style={tw` font-semibold text-lg`}>Recent</Text></View>
                <View
                    lightColor="white"
                    darkColor="#52525b"
                    style={tw`px-3 rounded-xl flex justify-center items-center mr-2`}
                ><Text style={tw` font-semibold text-lg`}>Recommended</Text></View>
            </ScrollView>
        </View>
    )
}