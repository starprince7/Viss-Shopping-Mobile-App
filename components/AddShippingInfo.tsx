import tw from "twrnc";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import HeaderIcon from "../components/HeaderIcon";
import { Text, View } from "../components/Themed";
import FormInput from "./FormInput";
import { Formik } from "formik";
import * as Yup from "yup";
import FormTwinInput from "./FormTwinInput";
import useColorScheme from "../hooks/useColorScheme";
import postShippingInfo from "../utills/postShippingInfoHelper";
import { ShippingInfo } from "../types";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import AsyncButton from "./AsyncButton";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { setShippingInformation } from "../store/slices/shippingInfoSlice";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import RenderCountries from "./RenderCountries";

type AddShippingInfoProps = {
  closeModal: () => void;
};

const AddShippingInfo = ({ closeModal }: AddShippingInfoProps) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const { customerId } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleBottomSheetOpen = () => {
    sheetRef.current?.snapToPosition("50%");
  };

  const handleItemSelect = (item: string) => {
    setCountry(item)
    sheetRef.current?.close()
  }

  // Initial form value
  const initialValues = {
    phoneNumber: "",
    homeAddress: "",
    country: country,
    state: "",
    zipcode: "",
    city: "",
  };

  // Form validation schema
  const shippingInfoSchema = Yup.object({
    phoneNumber: Yup.string().required("Please provide a cellphone number"),
    homeAddress: Yup.string().required("Please enter a delivery address"),
    country: Yup.string(),
    state: Yup.string().required("Provide your State province"),
    zipcode: Yup.string(),
    city: Yup.string().required("Please enter your current city"),
  });

  const saveNewShippingInfomartion = async (data: ShippingInfo) => {
    const id = customerId as string | number;
    setIsLoading(true);
    const { error, msg } = await postShippingInfo({ id, ...data });
    setIsLoading(false);

    // close this modal component before showing dialog error.
    if (error) {
      closeModal();
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error,
        button: "Dismiss",
      });
      return;
    }

    if (msg) {
      // Dispatch to the Shipping Info state.
      dispatch(setShippingInformation(msg.customerShippingInfo.shippingInfo));

      // close this modal component before showing dialog success.
      closeModal();
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: msg.msg,
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View lightColor="#eee" darkColor="#1B1F22" style={tw`flex-1 pt-6`}>
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={tw`w-10.5 ml-5 px-0.5 py-1.5 mb-3 rounded-[10px] bg-[#89A67E]`}
          >
            <HeaderIcon
              name="close"
              customStyle={tw`text-black mx-auto text-white`}
            />
          </TouchableOpacity>
          <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
            <View style={tw`p-5 bg-transparent`}>
              <Text style={tw`text-2xl font-bold`}>
                Add Shipping Information
              </Text>
              <Text style={tw` font-semibold my-2`}>
                Packages are delivered using this information.
              </Text>
            </View>
            {/* >>>>> Form Of Shipping Information <<<<< */}
            <Formik
              initialValues={initialValues}
              validationSchema={shippingInfoSchema}
              onSubmit={(values) => {
                const modified = {...values, country: country};
                saveNewShippingInfomartion(modified);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => {
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

                    <View
                      style={tw`flex-row justify-between items-center bg-transparent w-full relative`}
                    >
                      <FormTwinInput
                        title="State"
                        value={values.state}
                        placeholder="State of Residence"
                        onBlur={handleBlur("state")}
                        onChangeText={handleChange("state")}
                        error={touched.state && errors.state}
                      />
                      <Pressable
                        onPress={handleBottomSheetOpen}
                        style={tw`bg-transparent mb-2 mx-0.5 w-1/2 ${Platform.OS === "android" ? 'h-12': 'h-10'} px-0.8 border ${
                          errors.country
                            ? "border border-red-600"
                            : "border-gray-300 dark:border-gray-700"
                        } p-2.5 rounded-[10px]`}
                      >
                        <Text>{country}</Text>
                      </Pressable>
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

                    {/* Bottom Sheets */}
                    <BottomSheet
                      ref={sheetRef}
                      index={-1}
                      animateOnMount={false}
                      snapPoints={snapPoints}
                      enablePanDownToClose={true}
                      keyboardBlurBehavior="restore"
                      backgroundStyle={tw`dark:bg-gray-700`}
                    >
                      <BottomSheetScrollView>
                        <RenderCountries handleSelect={handleItemSelect} />
                      </BottomSheetScrollView>
                    </BottomSheet>

                    <AsyncButton
                      title="Save"
                      iconName="done-all"
                      isLoading={isLoading}
                      isLoadingTitle="Please wait..."
                      onPress={() => handleSubmit()}
                    />
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default AddShippingInfo;
