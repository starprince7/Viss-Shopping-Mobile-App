import { SafeAreaView, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import React from 'react'
import tw from "twrnc"

import { Text, View } from '../components/Themed';
import HeaderIcon from "../components/HeaderIcon"

export default function OrderDetails() {
    const navigation = useNavigation()

    const handlePaymentProcessing = () => {
        Alert.alert('Payment processing has started')
        setTimeout(() => {
            navigation.navigate('OrderSuccessScreen')
        }, 5000)
    }
    return (
        <SafeAreaView style={tw`flex-1`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1 pt-6`}
            >
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={tw`w-10.5 ml-5 px-0.5 py-1.5 mb-3 rounded-[10px] bg-[#89A67E]`}
                >
                    <HeaderIcon name='arrow-back' customStyle={tw`text-black mx-auto text-white`} />
                </TouchableOpacity>
                <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
                    <View style={tw`px-5 py-6 bg-transparent`}>
                        <Text style={tw`text-2xl font-bold`}>Order Details</Text>
                    </View>
                    {/* >>>>> Items In Cart <<<<< */}
                    <View style={tw`px-5 bg-transparent`}>
                        <Text style={tw`mb-2 text-gray-500 font-extrabold`}>3 Item(s) in Bag</Text>
                        <OrderItem />
                        <OrderItem />
                        <OrderItem />
                    </View>
                    <View style={tw`bg-transparent px-5`}>
                        {/* Total */}
                        <View style={tw`flex-row justify-between items-center py-5 px-1 border-b-2 border-gray-200 dark:border-gray-800 bg-transparent`}>
                            <View style={tw`flex-row items-center bg-transparent`}>
                                <View style={tw`bg-transparent w-29 ml-3`}>
                                    <Text style={tw`font-bold`}>Total</Text>
                                </View>
                            </View>
                            <View style={tw`bg-transparent`}><Text style={tw`font-bold`}>$600.00</Text></View>
                        </View>
                        {/* Delivery Time */}
                        <View style={tw`mt-6 pb-1.5 border-t border-gray-200 dark:border-gray-800 bg-transparent`}>
                            <View style={tw`bg-transparent ml-3`}>
                                <Text style={tw`font-extrabold text-gray-500 mb-3`}>Delivery Time</Text>
                                <Text style={tw`text-gray-400 text-sm`}>Items delivered outside lagos state may take up to 2 days to arrive</Text>
                            </View>
                        </View>
                    </View>
                    {/* >>>>> Account Information <<<<< */}
                    <View style={tw`pt-5 px-2 bg-transparent border-t border-b-2 border-gray-200 dark:border-gray-700 mt-3 mx-4`}>
                        <Text style={tw`mb-4 text-center text-gray-500 font-extrabold`}>Personal Information</Text>
                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>Email</Text>
                            <Text lightColor='#64748b' style={tw`text-sm mt-3 mb-5`}>Test@gmail.com</Text>
                        </View>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>Delivery Address</Text>
                            <Text lightColor='#64748b' style={tw`text-sm mt-3 mb-5`}>No 10 Test Street, United Test Kingdom</Text>
                        </View>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>City</Text>
                            <Text lightColor='#64748b' style={tw`text-sm mt-3 mb-5`}>Testing City</Text>
                        </View>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>Zip Code</Text>
                            <Text lightColor='#64748b' style={tw`text-sm mt-3 mb-5`}>120120</Text>
                        </View>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>Country</Text>
                            <Text lightColor='#64748b' style={tw`text-sm mt-3 mb-5`}>Nigeria</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    // onPress={() => Alert.alert("Payment processing will start now")}
                    onPress={handlePaymentProcessing}
                    style={tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-6 px-10.5 py-3 flex-row items-center justify-between`}>
                    <HeaderIcon name='payment' customStyle={tw`text-white mx-auto mr-1.5`} />
                    <Text style={tw`font-semibold text-white`}>Pay <Text style={tw`font-extrabold text-white`}>$600</Text> </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


// Order Item Component 
function OrderItem() {
    return (
        <View style={tw`flex-row justify-between items-end py-3 border-t-2 border-gray-200 dark:border-gray-800 px-1 bg-transparent`}>
            <View style={tw`flex-row items-center bg-transparent`}>
                <Image
                    style={tw`rounded-3xl h-17 w-16 mr-3`}
                    source={require("../assets/images/sample-watch.jpeg")}
                />
                <View style={tw`bg-transparent w-29`}>
                    <Text style={tw`font-semibold`}>Apple Watch Mini 2</Text>
                    <Text>Item's description text body</Text>
                </View>
            </View>
            <View style={tw`bg-transparent`}><Text style={tw`font-semibold`}>$200.00</Text></View>
        </View>
    )
}