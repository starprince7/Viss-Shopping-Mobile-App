import HeaderIcon from '../components/HeaderIcon';
import { Text, View } from '../components/Themed';
import tw from "twrnc"
import { SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"

export default function ShippingInfo() {
    const navigation = useNavigation()
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
                    <View style={tw`p-5 bg-transparent`}>
                        <Text style={tw`text-2xl font-bold`}>Shipping Information</Text>
                    </View>
                    {/* >>>>> Form Of Shipping Information <<<<< */}
                    <View style={tw`p-5 bg-transparent`}>
                        <View style={tw`bg-transparent mb-6`}>
                            <Text lightColor='#64748b'>Email</Text>
                            <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                        </View>

                        <View style={tw`bg-transparent mb-6`}>
                            <Text lightColor='#64748b'>Address</Text>
                            <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                        </View>


                        <View style={tw`flex-row justify-between items-center bg-transparent w-50`}>
                            <View style={tw`bg-transparent mb-6 w-[80.6%] mr-1.5`}>
                                <Text lightColor='#64748b'>City</Text>
                                <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                            </View>
                            <View style={tw`bg-transparent mb-6 w-[80.6%] ml-1.5`}>
                                <Text lightColor='#64748b'>Zip Code</Text>
                                <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                            </View>
                        </View>

                        <View style={tw`bg-transparent mb-6`}>
                            <Text lightColor='#64748b'>Country</Text>
                            <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.navigate("OrderDetails")}
                    style={tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-6 px-3.5 py-3 flex-row items-center justify-between`}>
                    <HeaderIcon name='next-week' customStyle={tw`text-white mx-auto mr-1.5`} />
                    <Text style={tw`font-bold text-white`}>Proceed to Payment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}