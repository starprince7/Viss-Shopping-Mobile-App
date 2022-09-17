import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import tw from "twrnc"

import EditScreenInfo from '../components/EditScreenInfo';
import HomeHeader from '../components/HomeHeader';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Products from '../components/Products';
import HeaderIcon from '../components/HeaderIcon';
import useProducts from '../hooks/useProducts';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
    const { isFetchingProduct, fetchProducts } = useProducts()
    
    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
            <View
                style={tw`flex-1`}
                lightColor="#eee"
                darkColor="#1B1F22"
            >
                <View style={tw`flex flex-row justify-between items-center bg-transparent px-5 ${Platform.OS === 'ios' ? `pt-6` : `pt-9`} pb-2`}>
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
                {
                    isFetchingProduct
                        ? (<Text style={tw`dark:text-white font-semibold p-5 mx-auto`}>Please wait fetching products...</Text>)
                        : <Products fetchProducts={fetchProducts} />
                }
            </View>
        </SafeAreaView>
    );
}

/**
 * Header Icon component.
 */


