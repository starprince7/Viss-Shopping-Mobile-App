import tw from "twrnc"
import axios from "axios";
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView, TouchableOpacity, ScrollView, Alert, Image, Platform } from 'react-native'
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

import { BASE_URL, FLUTTERWAVE_TEST_PUBLIC_KEY } from "@env";
import { Text, View } from '../components/Themed';
import HeaderIcon from "../components/HeaderIcon"
import Naira from '../components/FormatToNaira';
import { selectCartItems } from "../redux/slices/cartSlice";
import { selectSelectedShippingInfo } from "../redux/slices/shippingInfoSlice";
import OrderItem from "../components/OrderItem";
import { selectAuth } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import sumCart from "../utills/sumCart";
import generateTransactionReference from "../utills/generateReference";
import getProcessingFee from "../utills/getProcessingFee";
import AsyncButton from "../components/AsyncButton";

interface PaymentVerificationProps {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
}

export default function OrderDetails() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const cart = useSelector(selectCartItems) // get cart
    const totalPriceInCart = sumCart(cart) // cart sumTotal
    const { homeAddress, city, country, zipcode, phoneNumber, state } =
        useSelector(selectSelectedShippingInfo) // get shipping information
    const { customer } = useSelector(selectAuth) // get customer in auth state.
    const [processingFee, setProcessingFee] = React.useState(0)

    React.useEffect(() => {
        if (processingFee !== 0) return
        async function getFee() {
            const fee = await getProcessingFee(totalPriceInCart)
            setProcessingFee(fee)
        }
        getFee()
    }, [processingFee])

    const handlePaymentProcessing = () => {
        Alert.alert('Payment processing has started')
        setTimeout(() => {
            navigation.navigate('OrderSuccessScreen')
        }, 5000)
    }

    const totalAmountToPay = Number(totalPriceInCart) + Number(processingFee)
    const transactionDetails = {
        tx_ref: generateTransactionReference(10),
        authorization: FLUTTERWAVE_TEST_PUBLIC_KEY,
        customer: {
            email: customer.email
        },
        amount: totalAmountToPay,
        currency: 'NGN',
        payment_options: 'card',
        customizations: {
            title: "VISS STORE",
        },
        subaccounts: [
            {
                id: "RS_6BEEF3F40BAD1BE9357898421A4BA536",
                transaction_charge_type: "flat",
                transaction_charge: processingFee,
            },
        ],
    }

    const createNewOrder = async (data: PaymentVerificationProps) => {
        console.log({ PaymentVerificationProps: data })

        const { status, tx_ref, transaction_id } = data
        const orderInformation = {
            status,
            transaction_id,
            customer,
            processingFee,
            orderDetails: cart,
            transactionRef: tx_ref,
            sumTotal: totalAmountToPay,
            shippingFee: "",
        }

        const response = await axios.post(`${BASE_URL}/api/customer/create_order`, orderInformation)

        if (response.data.error || response.data.status === "Error") {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: response.data.error,
                button: 'dismiss',
            })
        }
        else if (response.data.msg) {
            navigation.navigate('OrderSuccessScreen')
            dispatch(clearCart())
        }
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
                    <View style={tw`px-5 pt-6 pb-3 bg-transparent`}>
                        <Text style={tw`text-2xl font-bold`}>Order Summary</Text>
                    </View>

                    {/* >>>>> Account Information <<<<< */}
                    <View style={tw`pt-5 shadow px-2 bg-transparent border-t border-b border-zinc-200 dark:border-gray-700 mt-3 mx-4`}>
                        <Text style={tw`mb-4 text-center text-gray-500 font-extrabold`}>Personal Information</Text>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>State</Text>
                            <Text lightColor='#737373' style={tw`text-sm mt-2 mb-3`}>{state}</Text>
                        </View>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>Country</Text>
                            <Text lightColor='#737373' style={tw`text-sm mt-2 mb-3`}>{country}</Text>
                        </View>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>Phone Number</Text>
                            <Text lightColor='#737373' style={tw`text-sm mt-2 mb-3`}>{phoneNumber}</Text>
                        </View>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>Email</Text>
                            <Text lightColor='#737373' style={tw`text-sm mt-2 mb-3`}>{customer.email}</Text>
                        </View>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>Delivery Address</Text>
                            <Text lightColor='#737373' style={tw`text-sm mt-2 mb-3`}>{homeAddress}</Text>
                        </View>

                        <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
                            <Text lightColor='#3f3f46' style={tw`font-bold`}>City</Text>
                            <Text lightColor='#737373' style={tw`text-sm mt-2 mb-3`}>{city}</Text>
                        </View>
                    </View>
                    {/* Delivery Time */}
                    <View style={tw`mt-6 px-3.5 pb-1.5 border-t border-gray-200 dark:border-gray-800 bg-transparent`}>
                        <View style={tw`bg-transparent ml-3`}>
                            <Text style={tw`font-extrabold text-gray-500 mb-3`}>Delivery Time</Text>
                            <Text style={tw`text-neutral-500 text-sm`}>Items delivered outside lagos state may take up to 2 days to arrive</Text>
                        </View>
                    </View>
                    {/* >>>>> Items In Cart <<<<< */}
                    <View style={tw`p-5 bg-transparent`}>
                        <Text style={tw`my-3 px-2 text-zinc-500 font-bold`}>{cart.length} Item{cart.length > 1 ? 's' : ''} In Your Baggage</Text>
                        {
                            cart.length !== 0 &&
                            cart.map(item => (
                                <OrderItem
                                    key={item._id}
                                    title={item.title as string}
                                    image={item.image as string}
                                    price={item.price as number}
                                    quantity={item.quantity as number}
                                />
                            ))
                        }
                    </View>
                    <View style={tw`bg-transparent px-5`}>
                        {/* Total */}
                        <View style={tw`flex-row justify-between items-center py-5 px-1 border-b-2 border-gray-200 dark:border-gray-800 bg-transparent`}>
                            <View style={tw`flex-row items-center bg-transparent`}>
                                <View style={tw`bg-transparent w-29 ml-3`}>
                                    <Text style={tw`font-bold`}>Total</Text>
                                </View>
                            </View>
                            <View style={tw`bg-transparent`}><Text style={tw`font-bold`}><Naira style={tw`text-neutral-600`}>{totalPriceInCart}</Naira></Text></View>
                        </View>
                        <View style={tw`flex-row justify-between items-center py-5 px-1 border-b-2 border-gray-200 dark:border-gray-800 bg-transparent`}>
                            <View style={tw`flex-row items-center bg-transparent`}>
                                <View style={tw`bg-transparent w-29 ml-3`}>
                                    <Text style={tw`font-bold`}>Processing fee</Text>
                                </View>
                            </View>
                            <View style={tw`bg-transparent`}><Text style={tw`font-bold`}><Naira style={tw`text-neutral-600`}>{processingFee}</Naira></Text></View>
                        </View>
                    </View>
                </ScrollView>
                <PayWithFlutterwave
                    options={transactionDetails}
                    onRedirect={createNewOrder}
                    customButton={(props) => (
                        <AsyncButton
                            startIcon="payment"
                            isLoading={props.disabled}
                            isLoadingTitle="Processing..."
                            onPress={props.onPress}
                        >
                            <Text style={tw`font-semibold text-white`}>
                                Pay <Text style={tw`font-extrabold`}><Naira style={tw`text-gray-100`}>{totalAmountToPay}</Naira></Text>
                            </Text>
                        </AsyncButton>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

