import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Alert, SafeAreaView } from 'react-native'
import tw from "twrnc"

import { Text, View } from '../components/Themed';

export default function OrderSuccessScreen() {
    const navigation = useNavigation()

    /* 
     * Function below will be called when This screen closes
     * For iOS function is called when this screen slides down.
   */
    navigation.addListener('blur', () => Alert.alert("Modal is Closed!"))
    return (
        <View style={tw`flex-1 bg-[#89A67E] pt-6`}>
            <SafeAreaView style={tw`flex-1`}>
                <View style={tw`bg-transparent flex-1 items-center justify-center px-5`}>
                    <MaterialIcons size={130} name="check-circle" style={tw`text-[#eee]`} />
                    <Text style={tw`text-lg font-bold text-[#eee] mt-1 text-center`}>Order Successful</Text>
                    <Text style={tw`text-sm text-[#eee] mt-1 text-center`}>Your order was received and is been sent for processing</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}