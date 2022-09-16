import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Alert, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import tw from "twrnc"

import { Text, View } from '../components/Themed';

export default function OrderSuccessScreen() {
    const navigation = useNavigation()

    /* 
     * Function below will be called when This screen closes
     * For iOS this function will be called when this screen slides down.
   */
    navigation.addListener('blur', () => {
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            // title: '',
            textBody: 'Your order has been sent for processing.'
        })
    })
    return (
        <View style={tw`flex-1 bg-[#89A67E] pt-6`}>
            <SafeAreaView style={tw`flex-1`}>
                <View style={tw`bg-transparent flex-1 items-center justify-center px-5`}>
                    <MaterialIcons size={150} name="check-circle" style={tw`text-[#eee]`} />
                    <Text style={tw`text-lg font-bold text-[#eee] mt-1 text-center`}>Order Successful</Text>
                    <Text style={tw`text-sm text-[#eee] mt-1 text-center`}>Your order was successfully received, and processing has begun.</Text>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        style={tw`py-3 px-4 bg-[#eee] mt-3.5 rounded-[10px]`}
                    >
                        <Text style={tw`text-[#89A67E] font-bold`}>Dismiss</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}