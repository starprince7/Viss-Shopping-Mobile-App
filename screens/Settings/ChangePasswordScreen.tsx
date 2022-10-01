import tw from "twrnc"
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Formik } from "formik"
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

import { View, Text } from "../../components/Themed"
import FormInput from "../../components/FormInput";
import AsyncButton from "../../components/AsyncButton";
import Card from "../../components/Card";
import { selectAuth } from "../../redux/slices/authSlice";
import changePassword from "../../utills/passwordHelper";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";


export default function ChangePasswordScreen() {
    const { customerId } = useSelector(selectAuth)
    const [isLoading, setIsLoading] = useState(false)

    const initialLoginData = {
        oldPassword: "",
        newPassword: '',
        confirmNewPassword: ''
    }

    const loginSchema = Yup.object({
        oldPassword: Yup.string().required("Enter your current password"),
        newPassword: Yup.string().required("Enter your new password").min(6),
        confirmNewPassword: Yup.string().equals([Yup.ref('newPassword'), null], 'Passwords do not match.')
    })

    const handlePasswordChange = async (values: typeof initialLoginData) => {
        setIsLoading(true)
        let data = {
            id: customerId as string,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        }
        const { error, msg } = await changePassword(data)
        setIsLoading(false)
        if (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                textBody: `Error! ${error}`
            })
        }
        // Success response here.
        if (msg) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                textBody: msg
            })
        }
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1`}
            >
                <KeyboardAvoidingView
                    style={tw`flex-1`}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? -500 : 0}
                >
                    <ScrollView style={tw`flex-1 py-5`} showsVerticalScrollIndicator={false}>
                        {/* >>>>> Form Of Signup Information <<<<< */}
                        <Formik
                            initialValues={initialLoginData}
                            validationSchema={loginSchema}
                            onSubmit={(values, actions) => {
                                handlePasswordChange(values)
                            }}
                        >
                            {
                                ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
                                    return (
                                        <>
                                            <Text style={tw`text-xl pl-5 mb-5 text-slate-800 dark:text-neutral-200 font-semibold`}>Change password</Text>
                                            <Card style={tw`pt-8 pb-4`}>
                                                <FormInput
                                                    title="Current Password"
                                                    value={values.oldPassword}
                                                    placeholder="Enter your current"
                                                    keyboardType="default"
                                                    onChangeText={handleChange("oldPassword")}
                                                    onBlur={handleBlur("oldPassword")}
                                                    error={touched.oldPassword && errors.oldPassword}
                                                />
                                                <FormInput
                                                    title="New Password"
                                                    secureTextEntry={true}
                                                    value={values.newPassword}
                                                    placeholder="Enter a new password"
                                                    keyboardType="default"
                                                    onChangeText={handleChange("newPassword")}
                                                    onBlur={handleBlur("newPassword")}
                                                    error={touched.newPassword && errors.newPassword}
                                                />
                                                <FormInput
                                                    title="Confirm New Password"
                                                    secureTextEntry={true}
                                                    value={values.confirmNewPassword}
                                                    placeholder="Re-enter new password"
                                                    keyboardType="default"
                                                    onChangeText={handleChange("confirmNewPassword")}
                                                    onBlur={handleBlur("confirmNewPassword")}
                                                    error={touched.confirmNewPassword && errors.confirmNewPassword}
                                                />
                                                <AsyncButton
                                                    title="Change Password"
                                                    iconName="done"
                                                    isLoading={isLoading}
                                                    isLoadingTitle="Please wait..."
                                                    onPress={() => handleSubmit()}
                                                />
                                            </Card>
                                        </>
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