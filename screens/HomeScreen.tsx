import tw from "twrnc"
import { MaterialIcons } from "@expo/vector-icons"
import { SafeAreaView, Platform, Pressable } from 'react-native';

import HomeHeader from '../components/HomeHeader';
import { View, Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Products from '../components/Products';
import HeaderIcon from '../components/HeaderIcon';
import { Categories } from '../components/Categories';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
            <View
                style={tw`flex-1`}
                lightColor="#eee"
                darkColor="#1B1F22"
            >
                <View style={tw`flex flex-row justify-between items-center bg-transparent px-5 ${Platform.OS === 'ios' ? `pt-2` : `pt-8`} pb-2`}>
                    <View
                        style={tw`bg-transparent flex-row items-center rounded-lg shadow-lg -ml-5 mr-0.5`}
                    >
                        <MaterialIcons size={15} name='shopping-basket' style={tw`mr-0.5 ml-4.5 text-[#A9AFA7] dark:text-gray-200`} />
                        <Text
                            lightColor="black"
                            darkColor="white"
                            style={tw`font-extrabold text-[#A9AFA7] text-[15px]`}
                        >
                            VissStore
                        </Text>
                    </View>
                    <View style={tw`flex flex-row bg-transparent pt-1`}>
                        <Pressable onPress={() => navigation.navigate('SearchScreen')}>
                        <HeaderIcon name='search' customStyle={tw`text-black dark:text-white -ml-0.9`} />
                        </Pressable>
                    </View>
                </View>
                <HomeHeader />
                <Categories />
                {/* <=================> Dynamic Categories Component Will Show Here <===================> */}
                <Products />
            </View>
        </SafeAreaView>
    );
}

/**
 * Header Icon component.
 */


