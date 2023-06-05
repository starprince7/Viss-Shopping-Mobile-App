import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import HomeHeader from "../components/HomeHeader";
import { View, Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Products from "../components/Products";
import HeaderIcon from "../components/HeaderIcon";
import { Categories } from "../components/Categories";
import VissStoreLogo from "../assets/native-svg/VissStoreLogo";
import { useRef, useState } from "react";
// import VissStoreLogo from '../assets/app-icons/viss_store_logo.svg'

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  return (
    <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
      <View style={tw`flex-1 pt-18`} lightColor="#eee" darkColor="#1B1F22">
        <View
          style={tw`flex flex-row justify-between items-center bg-transparent px-5 w-full absolute top-12 z-10`}
        >
          <View style={tw`flex flex-row bg-transparent pt-1`}>
            <Pressable onPress={() => navigation.navigate("SearchScreen")}>
              <HeaderIcon
                name="search"
                customStyle={tw`text-black dark:text-white -ml-0.9`}
              />
            </Pressable>
          </View>
          <View style={styles.brandLogo}>
            <VissStoreLogo width={50} height={50} style={tw`rounded`} />
          </View>
        </View>
        <HomeHeader />
        <Categories />
        <Products />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  brandLogo: {
    marginTop: 6,
    marginRight: 4,
    borderRadius: 12,
    width: 50,
    height: 50,
    border: "solid red 2px",
    backgroundColor: "#89A67E",
  },
});
