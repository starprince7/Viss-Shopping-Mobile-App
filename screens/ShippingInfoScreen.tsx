import HeaderIcon from '../components/HeaderIcon';
import { Modal, Text, View } from '../components/Themed';
import tw from "twrnc"
import { SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import AddShippingInfo from '../components/AddShippingInfo';
import { useState } from 'react';
import ShippingInfoCard from '../components/ShippingInfoCard';
import UpdateShippingInfo from '../components/UpdateShippingInfo';

export default function ShippingInfo() {
    const navigation = useNavigation()
    const [isAddShippingInfoModalOpen, setAddShippingInfoModalOpen] = useState(false)
    const [isUpdateShippingInfoModalOpen, setUpdateShippingInfoModalOpen] = useState(false)

    // close `Add` new shipping info modal
    const toggleAddShippingInfoModal = () => {
        setAddShippingInfoModalOpen(!isAddShippingInfoModalOpen)
    }

    // close `Update` shipping info modal
    const toggleUpdateShippingInfoModal = () => {
        setUpdateShippingInfoModalOpen(!isUpdateShippingInfoModalOpen)
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
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
                        <Text style={tw`font-semibold mt-2 mb-5`}>Please confirm these information below</Text>
                    </View>

                    {/* ************* Modal to `Create` Shipping Information Screen Start ********** */}
                    <Modal
                        visible={isAddShippingInfoModalOpen}
                        animationType="slide"
                    >
                        <View
                            lightColor="#eee"
                            darkColor="#1B1F22"
                            style={tw`bg-[#eee] dark:bg-[#1B1F22] flex-1`}>
                            <AddShippingInfo closeModal={toggleAddShippingInfoModal} />
                        </View>
                    </Modal>

                    {/* *****************************************************************************
                      * In-between Two Modals -- 2nd Modal is Below.
                     *******************************************************************************/}
                    

                    {/* ************* Modal to `Update` Shipping Information Screen Start ********** */}
                    <Modal
                        visible={isUpdateShippingInfoModalOpen}
                        animationType="slide"
                    >
                        <View
                            lightColor="#eee"
                            darkColor="#1B1F22"
                            style={tw`bg-[#eee] dark:bg-[#1B1F22] flex-1`}>
                            <UpdateShippingInfo closeModal={toggleUpdateShippingInfoModal} />
                        </View>
                    </Modal>
                    {/* ************ Modal to `Update` Shipping Information Screen End ********** */}


                    <View style={tw`w-full bg-transparent`}>
                        <Button onPress={toggleAddShippingInfoModal} color={"#89A67E"} title='Add Shipping Information' />
                    </View>

                    {/* >>>>> Card Container <<<<< */}
                    <View style={tw`p-5 bg-transparent`}>
                        {/* *** Shipping Info Card *** */}
                        <ShippingInfoCard toggleUpdateShippingInfoModal={toggleUpdateShippingInfoModal} />
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.navigate("OrderDetails")}
                    style={tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-2 px-3.5 py-3 flex-row items-center justify-between`}>
                    <Text style={tw`font-bold text-white`}>Proceed to Payment</Text>
                    <HeaderIcon name='navigate-next' customStyle={tw`text-white mx-auto ml-1.5`} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}