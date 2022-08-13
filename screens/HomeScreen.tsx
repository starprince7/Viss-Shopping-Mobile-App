import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import tw from "twrnc"

import EditScreenInfo from '../components/EditScreenInfo';
import HomeHeader from '../components/HomeHeader';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Products from '../components/Products';
import HeaderIcon from '../components/HeaderIcon';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
    return (
        <SafeAreaView style={tw`flex-1`}>
            <View
                style={tw`flex-1`}
                lightColor="#eee"
                darkColor="#1B1F22"
            >
                <View style={tw`flex flex-row justify-between items-center bg-transparent px-5 pt-5 pb-2`}>
                    <View
                        lightColor="white"
                        darkColor="#52525b"
                        style={tw`py-1.5 pr-3.5 rounded-lg shadow-lg`}
                    >
                        <HeaderIcon name='menu' customStyle={tw`text-black dark:text-white`} /></View>
                    <View style={tw`flex flex-row bg-transparent`}>
                        <HeaderIcon name='search' customStyle={tw`text-black dark:text-white`} />
                        <HeaderIcon name='crop-free' customStyle={tw`text-black dark:text-white`} />
                    </View>
                </View>
                <HomeHeader />
                {/* <=================> Dynamic Categories Component Will Show Here <===================> */}
                <Products />
            </View>
        </SafeAreaView>
    );
}

/**
 * Header Icon component.
 */


