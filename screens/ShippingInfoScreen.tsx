import tw from "twrnc"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView, ScrollView, TouchableOpacity, Button, Platform } from 'react-native';
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification"

import HeaderIcon from '../components/HeaderIcon';
import { Modal, Text, View } from '../components/Themed';
import AddShippingInfo from '../components/AddShippingInfo';
import ShippingInfoCard from '../components/ShippingInfoCard';
import UpdateShippingInfo from '../components/UpdateShippingInfo';
import { selectAuth } from '../store/slices/authSlice';
import { selectSelectedShippingInfo, selectShippingInfo, setSelected } from '../store/slices/shippingInfoSlice';
import { MaterialIcons } from "@expo/vector-icons";

export default function ShippingInfo() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const deliveryInformation = useSelector(selectShippingInfo)
    const [isAddShippingInfoModalOpen, setAddShippingInfoModalOpen] = useState(false)
    const [isUpdateShippingInfoModalOpen, setUpdateShippingInfoModalOpen] = useState(false)

    /* ***
     * Checking below if a customer has no shipping information and
     * then prompt customer with a modal to add a shipping information.
     */
    const shippingInfo = useSelector(selectShippingInfo)
    useEffect(() => {
        if (shippingInfo.length === 0) {
            setAddShippingInfoModalOpen(true)
        }
        if(shippingInfo.length === 1) {
            dispatch(setSelected(shippingInfo[0]))
        }
    }, [shippingInfo])

    // Grab selected shipping information for redux store
    const selectedShippingInfo = useSelector(selectSelectedShippingInfo)


    // Close `Add` new shipping info modal
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
                style={tw`flex-1 ${Platform.OS === 'ios' ? `pt-6` : `pt-9`}`}
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
                        <Text style={tw`font-semibold mt-2 mb-3`}>Please select your shipping information below.</Text>
                    </View>

                    {/* ************* Modal-View to `Create or Add` Shipping Information Screen Start ********** */}
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


                    {/* ************* Modal-View to `Update` Shipping Information Screen Start ********** */}
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


                    {/* <AlertSuccess /> */}
                    <View style={tw`w-full bg-transparent px-6`}>
                        <Button onPress={toggleAddShippingInfoModal} color={"#89A67E"} title='Add Shipping Information' />
                    </View>

                    {/* >>>>> Card Container <<<<< */}
                    <View style={tw`p-5 bg-transparent`}>
                        {/* *** Shipping Information Card *** */}
                        {
                            deliveryInformation.length !== 0 ?
                                (
                                    deliveryInformation.map((info) => (
                                        <View key={info._id} style={tw`bg-transparent`}>
                                            <ShippingInfoCard {...info} toggleUpdateShippingInfoModal={toggleUpdateShippingInfoModal} />
                                        </View>
                                    ))
                                )
                                :
                                (
                                    <View
                                        style={tw`bg-transparent`}
                                    >
                                        <MaterialIcons name="local-shipping" size={160} style={tw`text-neutral-400 mx-auto mt-10 mb-5`} />
                                        <Text
                                            style={tw`text-center text-neutral-400 font-semibold`}
                                        >You do not have a delivery information, please add your shipping information to continue shopping.</Text>
                                    </View>
                                )
                        }
                    </View>
                </ScrollView>
                {
                    // Enable Button if only there's a shipping info & a selected shipping Information. 
                    deliveryInformation.length !== 0 && selectedShippingInfo._id !== null ? (
                        <TouchableOpacity
                            disabled={deliveryInformation.length === 0}
                            onPress={() => navigation.navigate("OrderSummary")}
                            style={tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-2 px-3.5 py-3 flex-row items-center justify-between`}>
                            <Text style={tw`font-bold text-white`}>Continue</Text>
                            <HeaderIcon name='navigate-next' customStyle={tw`text-white mx-auto ml-1.5`} />
                        </TouchableOpacity>
                    )
                    :
                    (
                        <TouchableOpacity
                            disabled={true}
                            style={tw`rounded-[10px] bg-[#c4d4bf] shadow-sm mx-auto mb-2 px-3.5 py-3 flex-row items-center justify-between`}>
                            <Text style={tw`font-bold text-white`}>Continue</Text>
                            <HeaderIcon name='navigate-next' customStyle={tw`text-white mx-auto ml-1.5`} />
                        </TouchableOpacity>
                    )
                }

            </View>
        </SafeAreaView>
    )
}