import tw from "twrnc"
import * as Yup from "yup";
import { Formik } from 'formik';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RNPickerSelect from "react-native-picker-select";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import { SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

import FormInput from "./FormInput";
import AsyncButton from "./AsyncButton";
import { ShippingInfo } from "../types";
import { Text, View } from '../components/Themed';
import { selectAuth } from "../redux/slices/authSlice";
import HeaderIcon from '../components/HeaderIcon';
import FormTwinInput from "./FormTwinInput";
import postShippingInfoUpdate from "../utills/updateShippingInfoHelper";
import { selectShippingInfoToUpdate, setSelected, setShippingInformation } from "../redux/slices/shippingInfoSlice";

type UpdateShippingInfoProps = {
    closeModal: () => void;
}

const UpdateShippingInfo = ({ closeModal }: UpdateShippingInfoProps) => {
    const { customerId } = useSelector(selectAuth)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const {
        _id,
        homeAddress,
        phoneNumber,
        state,
        city,
        country,
        zipcode
    } = useSelector(selectShippingInfoToUpdate);

    // Initial Formik - form values from Redux update shipping info state.
    const initialValues = {
        phoneNumber,
        homeAddress,
        country,
        state,
        zipcode,
        city,
    }

    // Form validation schema
    const shippingInfoSchema = Yup.object({
        phoneNumber: Yup.string().required('Please provide a cellphone number'),
        homeAddress: Yup.string().required('Please enter a delivery address'),
        country: Yup.string().required(),
        state: Yup.string().required("Provide your State province"),
        zipcode: Yup.string(),
        city: Yup.string().required('Please enter your current city'),
    })

    const saveUpdatedShippingInfomartion = async (data: ShippingInfo) => {
        /* ***
        * To update a particular shipping innformation
        * Two ID's are needed;
        * 1. A customer IDENTITY Id.
        * 2. An ID from from the shipping info array.
         */
        const id = customerId as string | number;
        // shipping Info Id.
        const shippingInfo_Id = _id as string | number;

        setIsLoading(true)
        const { error, msg } = await postShippingInfoUpdate({ id, shippingInfo_Id, ...data })
        setIsLoading(false)

        if (error) {
            // close this modal component before showing dialog error.
            closeModal()
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error,
                button: 'Dismiss'
            })
            return
        }

        if (msg) {
            // Update the Shipping Info state.
            dispatch(setShippingInformation(msg.customerShippingInfo.shippingInfo))
            
            // set this updated shipping information to the selected shippingInfo in Redux state.
            for (let shippingInfo of msg.customerShippingInfo.shippingInfo) {
                if (shippingInfo._id === shippingInfo_Id) {
                    dispatch(setSelected(shippingInfo))
                }
            }
            // close this modal component before showing dialog error.
            closeModal()
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: msg.msg
            })
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
                            <Text style={tw`text-2xl font-bold`}>Update Shipping Info</Text>
                            <Text style={tw` font-semibold my-2`}>Packages are delivered using this information</Text>
                        </View>
                        {/* >>>>> Form Of Shipping Information <<<<< */}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={shippingInfoSchema}
                            onSubmit={(values) => {
                                saveUpdatedShippingInfomartion(values)
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
                                            title="Update"
                                            iconName="done"
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
        </SafeAreaView>
    )
}

export default UpdateShippingInfo