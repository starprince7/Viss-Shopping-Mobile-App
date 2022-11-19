import tw from "twrnc"
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Formik } from "formik"
import { useNavigation } from "@react-navigation/native";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";

import Input from "../../components/Input";
import HeaderIcon from "../../components/HeaderIcon";
import signupCustomer from "../../utills/signupHelper";
import loginCustomer from "../../utills/loginHelper"
import { View, Text } from "../../components/Themed";
import { LoginData } from "../../types";
import { CartItemType, selectCartItems, setCartItems } from "../../redux/slices/cartSlice";
import { setCustomer, selectAuth, setApiError, setLogInApiError, setLoggedInCustomer } from "../../redux/slices/authSlice";
import FormInput from "../../components/FormInput";
import FormTwinInput from "../../components/FormTwinInput";
import { setShippingInformation } from "../../redux/slices/shippingInfoSlice";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export default function LoginScreen() {
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

    const initialLoginData = {
        email: "",
        password: '',
        cart: cart
    }

    const loginSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6)
    })

    const handleLoginSubmit = async (newCustomer: LoginData) => {
        // reset email API err
        setEmailApiError('')
        setLoading(true)
        const { error, data } = await loginCustomer(newCustomer)
        setLoading(false)
        // check for email error from api
        error && setEmailApiError(error)
        error && dispatch(setLogInApiError(error))

        // If Successful login below.
        if (data) {
            let cart = data.customer.cart as CartItemType[];
            let shippingInfo = data.customer.shippingInfo;

            // update customer to auth state.
            dispatch(setLoggedInCustomer(data))
            // Update customer cart items to cart state.
            dispatch(setCartItems(cart))
            // Dispatch to the Shipping Info state.
            dispatch(setShippingInformation(shippingInfo))

            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                textBody: 'Welcome back! You\'re signed in'
            })
            navigation.goBack()
        }
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1 pt-13`}
            >
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={tw`w-10 ml-2 ${Platform.OS === 'ios' ? `mb-1` : ``}`}
                >
                    <HeaderIcon name='arrow-back' customStyle={tw`mx-auto`} />
                </TouchableOpacity>
                <KeyboardAvoidingView
                    style={tw`flex-1`}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? -500 : 0}
                >
                    <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
                        <View style={tw`p-5 bg-transparent`}>
                            <Text style={tw`text-2xl text-slate-800 dark:text-white font-extrabold`}>Sign In</Text>
                            <Text style={tw`text-slate-800 dark:text-neutral-400 font-semibold my-2`}>Welcome, please sign in to continue shopping.</Text>
                        </View>
                        {/* >>>>> Form Of Signup Information <<<<< */}
                        <Formik
                            initialValues={initialLoginData}
                            validationSchema={loginSchema}
                            onSubmit={(values, actions) => {
                                handleLoginSubmit(values)
                            }}
                        >
                            {
                                ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
                                    return (
                                        <View style={tw`p-5 bg-transparent`}>
                                            <FormInput
                                                title="Email"
                                                value={values.email}
                                                placeholder="Enter your address"
                                                keyboardType="email-address"
                                                onChangeText={handleChange("email")}
                                                onBlur={handleBlur("email")}
                                                error={touched.email && errors.email}
                                                emailApiError={emailApiError}
                                            />
                                            <FormInput
                                                title="Password"
                                                secureTextEntry={true}
                                                value={values.password}
                                                placeholder="Enter your password"
                                                keyboardType="name-phone-pad"
                                                onChangeText={handleChange("password")}
                                                onBlur={handleBlur("password")}
                                                error={touched.password && errors.password}
                                            />
                                            {
                                                !loading
                                                    ? (
                                                        <TouchableOpacity
                                                            onPress={() => handleSubmit()}
                                                            style={tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-2 px-3.5 py-3 flex-row items-center justify-between`}>
                                                            <Text style={tw`font-bold text-white`}>Sign In</Text>
                                                            <HeaderIcon name='lock-outline' customStyle={tw`text-white mx-auto ml-1.5`} />
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
                                                    Don't have an account?
                                                    <Text
                                                        onPress={() => navigation.navigate("SignupScreen")}
                                                        style={tw`text-[#89A67E] font-semibold ml-2`}> Sign Up</Text>.
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