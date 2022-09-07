import tw from "twrnc"
import { SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import RNPickerSelect from 'react-native-picker-select';

import HeaderIcon from '../components/HeaderIcon';
import { Text, View } from '../components/Themed';
import FormInput from './FormInput';
import { Formik } from 'formik';
import * as Yup from "yup";
import FormTwinInput from './FormTwinInput';
import useColorScheme from "../hooks/useColorScheme";
import postShippingInfo from "../utills/postShippingInfoHelper";
import { ShippingInfo } from "../types";
import { useState } from "react";
import AsyncButton from "./AsyncButton";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { setShippingInformation } from "../redux/slices/shippingInfoSlice";

type AddShippingInfoProps = {
    closeModal: () => void;
}

const AddShippingInfo = ({ closeModal }: AddShippingInfoProps) => {
    const navigation = useNavigation()
    const { customerId } = useSelector(selectAuth)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const colorScheme = useColorScheme()

    const initialValues = {
        phoneNumber: "",
        homeAddress: "",
        country: "",
        state: "",
        zipcode: "",
        city: "",
    }

    const shippingInfoSchema = Yup.object({
        phoneNumber: Yup.string().required('Please provide a cellphone number'),
        homeAddress: Yup.string().required('Please enter a delivery address'),
        country: Yup.string().required(),
        state: Yup.string().required("Provide your State province"),
        zipcode: Yup.string(),
        city: Yup.string().required('Please enter your current city'),
    })

    const saveNewShippingInfomartion = async (data: ShippingInfo) => {
        const id = customerId as string | number;
        setIsLoading(true)
        const { error, msg } = await postShippingInfo({ id, ...data })
        setIsLoading(false)

        if (error) return Alert.alert(error)
        if (msg) {
            // Update the Shipping Info state.
            dispatch(setShippingInformation(msg.customerShippingInfo.shippingInfo))
            Alert.alert(msg.msg)
            closeModal()
            navigation.navigate("OrderDetails")
        }
    }


    return (

        <SafeAreaView style={tw`flex-1`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1 pt-6`}
            >
                <KeyboardAvoidingView
                    style={tw`flex-1`}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
                >
                    <TouchableOpacity
                        onPress={closeModal}
                        style={tw`w-10.5 ml-5 px-0.5 py-1.5 mb-3 rounded-[10px] bg-[#89A67E]`}
                    >
                        <HeaderIcon name='close' customStyle={tw`text-black mx-auto text-white`} />
                    </TouchableOpacity>
                    <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
                        <View style={tw`p-5 bg-transparent`}>
                            <Text style={tw`text-2xl font-bold`}>Add Shipping Information</Text>
                            <Text style={tw` font-semibold my-2`}>Packages are delivered using this information.</Text>
                        </View>
                        {/* >>>>> Form Of Shipping Information <<<<< */}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={shippingInfoSchema}
                            onSubmit={(values) => {
                                saveNewShippingInfomartion(values)
                            }}
                        >
                            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
                                return (
                                    <View style={tw`p-5 bg-transparent`}>
                                        <FormInput
                                            title="Home Address"
                                            value={values.homeAddress}
                                            placeholder="Enter a delivery address"
                                            keyboardType="default"
                                            onChangeText={handleChange("homeAddress")}
                                            onBlur={handleBlur("homeAddress")}
                                            error={touched.homeAddress && errors.homeAddress}
                                        />

                                        <FormInput
                                            title="Phone"
                                            value={values.phoneNumber}
                                            placeholder="Enter a phone number"
                                            keyboardType="number-pad"
                                            onChangeText={handleChange("phoneNumber")}
                                            onBlur={handleBlur("phoneNumber")}
                                            error={touched.phoneNumber && errors.phoneNumber}
                                        />


                                        <View style={tw`flex-row justify-between items-center bg-transparent w-full`}>
                                            <FormTwinInput
                                                title="State"
                                                value={values.state}
                                                placeholder="State of Residence"
                                                onBlur={handleBlur("state")}
                                                onChangeText={handleChange("state")}
                                                error={touched.state && errors.state}
                                            />
                                            <View style={tw`bg-transparent mb-2 mx-0.5 w-1/2 px-0.8 border dark:border-gray-700 p-4 rounded-[10px]`}>
                                                <RNPickerSelect
                                                    value={values.country}
                                                    placeholder={{ label: 'Country' }}
                                                    style={tw`dark:text-white`}
                                                    onValueChange={handleChange("country")} /* (value) => console.log("Picker select values::> ", value) */
                                                    items={[
                                                        { label: 'Nigeria', value: 'NG' }
                                                    ]}
                                                />
                                            </View>
                                            <Text style={tw`mt-2 text-red-500 text-xs mt-18 -ml-20 mr-50`}>{errors.country}</Text>

                                        </View>

                                        <FormInput
                                            title="City"
                                            value={values.city}
                                            placeholder="Please enter your city"
                                            keyboardType="default"
                                            onChangeText={handleChange("city")}
                                            onBlur={handleBlur("city")}
                                            error={touched.city && errors.city}
                                        />

                                        <AsyncButton
                                            title="Save"
                                            iconName="done-all"
                                            isLoading={isLoading}
                                            isLoadingTitle="Please wait..."
                                            onPress={() => handleSubmit()}
                                        />
                                    </View>
                                )
                            }}
                        </Formik>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView >

    )
}

export default AddShippingInfo