import tw from "twrnc"
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Formik } from "formik"
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";

import HeaderIcon from "../../components/HeaderIcon";
import signupCustomer from "../../utills/signupHelper";
import { View, Text } from "../../components/Themed";
import { SignupData } from "../../types";
import { selectCartItems } from "../../redux/slices/cartSlice";
import { setSignedUpCustomer, selectAuth, setApiError } from "../../redux/slices/authSlice";
import FormInput from "../../components/FormInput";
import FormTwinInput from "../../components/FormTwinInput";
import { useNavigation } from "@react-navigation/native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function SignupScreen() {
    const dispatch = useDispatch()
    const cart = useSelector(selectCartItems)
    const authState = useSelector(selectAuth)
    const navigation = useNavigation()
    const [emailApiError, setEmailApiError] = useState('')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("Customer's Id: ", authState.customerId)
        console.log("Error in Auth State", authState.error + "\n")
    }, [authState])

    const initialSignupFormData = {
        name: { firstname: '', lastname: '' },
        email: "",
        password: '',
        confirmPassword: '',
        cart: cart
    }

    const signupSchema = Yup.object({
        name: Yup.object({
            firstname: Yup.string().required('Please enter a first name'),
            lastname: Yup.string().required('Please enter a last name'),
        }),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
        // @ts-ignore
        confirmPassword: Yup.string().equals([Yup.ref('password'), null], 'Passwords do not match!')
    })

    const handleSignupSubmit = async (newCustomer: SignupData) => {
        // reset email API err
        setEmailApiError('')
        setLoading(true)
        const { error, data } = await signupCustomer(newCustomer)
        setLoading(false)
        // chexck fro email error from api
        error?.email && setEmailApiError(error.email)
        error && dispatch(setApiError(error))

        // If Successful signup below
        if (data) {
            dispatch(setSignedUpCustomer(data))
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Account created',
                textBody: 'You\'re signed in'
            })
            navigation.goBack()
            navigation.goBack()
            navigation.navigate("ShippingInfo")
        }
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1 pt-13`}
            >
                <KeyboardAvoidingView
                    style={tw`flex-1`}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? -500 : 0}
                >
                    <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
                        <View style={tw`p-5 bg-transparent`}>
                            <Text style={tw`text-2xl font-extrabold`}>Sign Up</Text>
                            <Text style={tw` font-semibold my-2`}>Create an account to continue.</Text>
                        </View>
                        {/* >>>>> Form Of Signup Information <<<<< */}
                        <Formik
                            initialValues={initialSignupFormData}
                            validationSchema={signupSchema}
                            onSubmit={(values, actions) => {
                                handleSignupSubmit(values)
                            }}
                        >
                            {
                                ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
                                    return (
                                        <View style={tw`p-5 bg-transparent`}>
                                            <View style={tw`flex-row justify-between w-full bg-transparent`}>
                                                <FormTwinInput
                                                    title="First Name"
                                                    value={values.name.firstname}
                                                    onBlur={handleBlur("name.firstname")}
                                                    onChangeText={handleChange("name.firstname")}
                                                    error={touched.name?.firstname && errors.name?.firstname}
                                                    placeholder="Your first name"
                                                />
                                                <FormTwinInput
                                                    title="Last Name"
                                                    value={values.name.lastname}
                                                    onChangeText={handleChange("name.lastname")}
                                                    onBlur={handleBlur("name.lastname")}
                                                    error={touched.name?.lastname && errors.name?.lastname}
                                                    placeholder="Your last name"
                                                />
                                            </View>

                                            <FormInput
                                                title="Email"
                                                value={values.email}
                                                keyboardType="email-address"
                                                onChangeText={handleChange("email")}
                                                onBlur={handleBlur("email")}
                                                error={touched.email && errors.email}
                                                emailApiError={emailApiError}
                                                placeholder="Enter your email address"
                                            />
                                            <FormInput
                                                title="Password"
                                                secureTextEntry
                                                value={values.password}
                                                keyboardType="visible-password"
                                                onChangeText={handleChange("password")}
                                                onBlur={handleBlur("password")}
                                                error={touched.password && errors.password}
                                                placeholder="Enter a password combination"
                                            />
                                            <FormInput
                                                title="Confirm Password"
                                                secureTextEntry
                                                value={values.confirmPassword}
                                                keyboardType="visible-password"
                                                onChangeText={handleChange("confirmPassword")}
                                                onBlur={handleBlur("confirmPassword")}
                                                error={touched.confirmPassword && errors.confirmPassword}
                                                placeholder="Re-enter your password combination"
                                            />
                                            {
                                                !loading
                                                    ? (
                                                        <TouchableOpacity
                                                            onPress={() => handleSubmit()}
                                                            style={tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-2 px-3.5 py-3 flex-row items-center justify-between`}>
                                                            <Text style={tw`font-bold text-white`}>Sign Up</Text>
                                                            <HeaderIcon name='account-circle' customStyle={tw`text-white mx-auto ml-1.5`} />
                                                        </TouchableOpacity>
                                                    )
                                                    : (
                                                        <TouchableOpacity
                                                            disabled
                                                            onPress={() => handleSubmit()}
                                                            style={tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-2 px-3.5 py-3 flex-row items-center justify-between`}>
                                                            <Text style={tw`font-bold text-white`}>Please wait...</Text>
                                                            <HeaderIcon name='hourglass-top' customStyle={tw`text-white mx-auto ml-1.5`} />
                                                        </TouchableOpacity>
                                                    )
                                            }
                                            <View style={tw`bg-transparent mx-auto`}>
                                                <Text style={tw`mt-4 text-gray-700 dark:text-gray-300`}>
                                                    Already have an account?
                                                    <Text
                                                        onPress={() => navigation.navigate("LoginScreen")}
                                                        style={tw`text-[#89A67E] font-semibold ml-2`}> Log In</Text>.
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }
                            }
                        </Formik>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView >
    )
}