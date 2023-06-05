import { FlatList, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import tw from "twrnc";
import { Text, View } from "./Themed";

export default function HomeHeader() {
  const handleClearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      // alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
  }
  return (
    <View style={tw`pt-3 px-5 mt-6`} lightColor="#eee" darkColor="#1B1F22">
      <Pressable onPress={handleClearAsyncStorage}>
        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
          style={tw`font-extrabold text-3xl w-[80%]`}
        >
          Discover
        </Text>
      </Pressable>
      <Text
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
        style={tw`font-extrabold text-3xl w-[80%]`}
      >
        our new items
      </Text>
    </View>
  );
}
