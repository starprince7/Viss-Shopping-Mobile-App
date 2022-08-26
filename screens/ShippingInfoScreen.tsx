import HeaderIcon from '../components/HeaderIcon';
import { Modal, Text, View } from '../components/Themed';
import tw from "twrnc"
import { SafeAreaView, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import AddShippingInfo from '../components/AddShippingInfo';
import { useState } from 'react';

export default function ShippingInfo() {
    const navigation = useNavigation()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
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
                    <View style={tw`p-5 bg-transparent`}>
                        <Text style={tw`text-2xl font-bold`}>Shipping Information</Text>
                    </View>

                    {/* **** Modal Screen Start **** */}
                    <Modal
                        visible={isModalOpen}
                        animationType="slide"
                    >
                        <View
                            lightColor="#eee"
                            darkColor="#1B1F22"
                            style={tw`bg-[#eee] dark:bg-[#1B1F22] flex-1`}>
                            <AddShippingInfo closeModal={toggleModal} />
                        </View>
                    </Modal>
                    {/* **** Modal Screen End **** */}


                    <View style={tw`w-full bg-transparent`}>
                        <Button onPress={toggleModal} color={"#89A67E"} title='Add Shipping Information' />
                    </View>

                    {/* >>>>> Card Container <<<<< */}
                    <View style={tw`p-5 bg-transparent`}>
                        {/* *** Shipping Info Card *** */}
                        < View
                            style={tw`w-full border p-5 bg-transparent border-gray-700 rounded-lg`}
                        >
                            <Text style={tw`mt-2 mb-1 font-semibold`}>Delivery Address</Text>
                            <Text style={tw`mb-2 `}>Place holder street opp site 2</Text>
                            <Text style={tw`mt-2 mb-1 font-semibold`}>Phone</Text>
                            <Text style={tw`mb-2 `}>0904985085</Text>
                            <Text style={tw`mt-2 mb-1 font-semibold`}>City</Text>
                            <Text style={tw`mb-2 `}>Place Holder city town, Jos</Text>
                            <Text style={tw`mt-2 mb-1 font-semibold`}>Country</Text>
                            <Text style={tw`mb-2 `}>Nigeria</Text>
                            <Text style={tw`mt-2 mb-1 font-semibold`}>Zip Code</Text>
                            <Text style={tw`mb-2 `}>120120</Text>
                            
                            <Button color="#89A67E" title='Update Info' />
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