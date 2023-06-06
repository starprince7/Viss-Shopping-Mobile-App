import tw from "twrnc";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

import {
  BASE_URL,
  FLUTTERWAVE_TEST_PUBLIC_KEY,
  PAYSTACK_PUBLIC_KEY,
} from "@env";
import { Text, View } from "../components/Themed";
import HeaderIcon from "../components/HeaderIcon";
import Naira from "../components/FormatToNaira";
import { selectCartItems } from "../store/slices/cartSlice";
import { selectSelectedShippingInfo } from "../store/slices/shippingInfoSlice";
import OrderItem from "../components/OrderItem";
import { selectAuth } from "../store/slices/authSlice";
import { clearCart } from "../store/slices/cartSlice";
import sumCart, { getItemsQuantity } from "../utills/sumCart";
import generateTransactionReference from "../utills/generateReference";
import getProcessingFee from "../utills/getProcessingFee";
import AsyncButton from "../components/AsyncButton";

// Flutterwave Payment Success Prop
interface PaymentVerificationProps {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}

// Paystck Paym,ent Success Prop.
interface PaystackSuccessResponse {
  status: "sucsess" | "failed";
  transactionRef: TransactionRefPaystack;
  data: {
    event: string;
    transactionRef: TransactionRefPaystack;
  };
}

type TransactionRefPaystack = {
  message: string;
  redirecturl: string;
  reference: string;
  status: "success" | "failed";
  trans: string;
  transaction: string;
  trxref: string;
};

type SuccessResponse = {
  flutterwaveData: PaymentVerificationProps;
  paystackData: PaystackSuccessResponse;
  flutterwave?: string;
  paystack?: string;
};

export default function OrderDetails() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector(selectCartItems); // get cart
  const itemsInCart = getItemsQuantity(cart);
  const totalPriceInCart = sumCart(cart); // cart sumTotal
  const { homeAddress, city, country, zipcode, phoneNumber, state } =
    useSelector(selectSelectedShippingInfo); // get shipping information
  const selectedShippingInformation = useSelector(selectSelectedShippingInfo); // get shipping information [Yes, same thing above!]
  const { customer } = useSelector(selectAuth); // get customer in auth state.
  const [processingFee, setProcessingFee] = React.useState(0);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const [isloading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (processingFee !== 0) return;
    async function getFee() {
      const fee = await getProcessingFee(totalPriceInCart);
      setProcessingFee(fee);
    }
    getFee();
  }, [processingFee]);

  const totalAmountToPay = Number(totalPriceInCart) + Number(processingFee);
  const transactionDetails = {
    tx_ref: generateTransactionReference(10),
    authorization: FLUTTERWAVE_TEST_PUBLIC_KEY,
    customer: {
      email: customer.email as string,
    },
    amount: totalAmountToPay,
    currency: "NGN",
    payment_options: "card",
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
  };

  /**
   * Paystack payment integration.
   */

  const createNewOrder = async ({
    flutterwaveData,
    paystackData,
    paystack,
    flutterwave,
  }: SuccessResponse) => {
    const { status, tx_ref, transaction_id } = flutterwaveData;
    const { data, transactionRef } = paystackData;

    // MODIFY CUSTOMER OBJECT
    let _customer = {
      email: customer.email,
      name: {
        firstname: customer.name.firstname,
        lastname: customer.name.lastname,
      },
      shippingInfo: selectedShippingInformation,
    };

    const orderInformation = {
      paymentProcessor: flutterwave || paystack,
      status: status || data.event,
      transaction_id: transaction_id || transactionRef.trxref,
      customer: _customer,
      processingFee,
      orderDetails: cart,
      transactionRef: tx_ref || transactionRef.reference,
      sumTotal: totalAmountToPay,
      shippingFee: "",
    };
    console.log("The Content going to the server: ", orderInformation);

    setIsLoading(true);
    let response;
    try {
      response = await axios.post(
        `${BASE_URL}/api/customer/order/create_order`,
        orderInformation
      );
    } catch (e: any) {
      setIsLoading(false);
      console.log("Error occured while sending order to the server.", e);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: `Error failed to create order, ${e.message}`,
        button: "dismiss",
      });
    }

    if (response?.data.error || response?.data.status === "Error") {
      setIsLoading(false);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: response.data.error,
        button: "dismiss",
      });
    } else if (response?.data.msg) {
      setIsLoading(false);
      navigation.navigate("OrderSuccessScreen", {
        successMessage: response.data.msg,
      });
      dispatch(clearCart());
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
      <View
        lightColor="#eee"
        darkColor="#1B1F22"
        style={tw`flex-1 ${Platform.OS === "ios" ? `pt-6` : `pt-9`}`}
      >
        {isloading && (
          <>
            <ActivityIndicator
              size="large"
              color="#89A67E"
              style={tw`top-[35%]`}
            />
            <Text style={tw`top-[36%] left-[25%] text-xs font-regular text-gray-500`}>Awaiting payment confirmation...</Text>
          </>
        )}
        <TouchableOpacity
          onPress={navigation.goBack}
          style={tw`w-10.5 ml-5 px-0.5 py-1.5 mb-3 rounded-[10px] bg-[#89A67E]`}
        >
          <HeaderIcon
            name="arrow-back"
            customStyle={tw`text-black mx-auto text-white`}
          />
        </TouchableOpacity>
        <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
          <View style={tw`px-5 pt-6 pb-3 bg-transparent`}>
            <Text style={tw`text-2xl font-bold`}>Order Summary</Text>
          </View>

          {/* >>>>> Items In Cart <<<<< */}
          <View style={tw`p-5 bg-transparent`}>
            <Text style={tw`my-3 px-2 text-zinc-500 font-bold`}>
              You have {itemsInCart} Item{itemsInCart > 1 ? "s" : ""} in your
              order.
            </Text>
            {cart.length !== 0 &&
              cart.map((item) => (
                <OrderItem
                  key={item._id}
                  title={item.title as string}
                  image={item.image as string}
                  price={item.price as number}
                  quantity={item.quantity as number}
                />
              ))}
          </View>

          {/* Delivery Time */}
          <View style={tw`mt-6 px-3 pb-1.5 bg-transparent`}>
            <View
              style={tw`ml-2 bg-[#ffcc0033] py-2 rounded-lg flex-row justify-start items-center`}
            >
              <HeaderIcon name="info" customStyle={tw`text-neutral-800`} />
              <Text style={tw`text-neutral-800 w-70 ml-3.5 text-xs`}>
                Items delivered outside lagos state may take up to 2 days to
                arrive.
              </Text>
            </View>
          </View>

          {/* >>>>> Account Information <<<<< */}
          <View
            style={tw`pt-5 px-2 bg-transparent border-t border-b border-zinc-200 dark:border-gray-700 mt-3 mx-4`}
          >
            <Text style={tw`mb-4 text-center text-gray-500 font-extrabold`}>
              Personal Informationss
            </Text>

            <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
              <Text lightColor="#3f3f46" style={tw`font-bold`}>
                State
              </Text>
              <Text lightColor="#737373" style={tw`text-sm mt-2 mb-3`}>
                {state}
              </Text>
            </View>

            <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
              <Text lightColor="#3f3f46" style={tw`font-bold`}>
                Country
              </Text>
              <Text lightColor="#737373" style={tw`text-sm mt-2 mb-3`}>
                {country}
              </Text>
            </View>

            <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
              <Text lightColor="#3f3f46" style={tw`font-bold`}>
                Phone Number
              </Text>
              <Text lightColor="#737373" style={tw`text-sm mt-2 mb-3`}>
                {phoneNumber}
              </Text>
            </View>

            <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
              <Text lightColor="#3f3f46" style={tw`font-bold`}>
                Email
              </Text>
              <Text lightColor="#737373" style={tw`text-sm mt-2 mb-3`}>
                {customer.email}
              </Text>
            </View>

            <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
              <Text lightColor="#3f3f46" style={tw`font-bold`}>
                Delivery Address
              </Text>
              <Text lightColor="#737373" style={tw`text-sm mt-2 mb-3`}>
                {homeAddress}
              </Text>
            </View>

            <View style={tw`bg-transparent mb-1.5 border-gray-500`}>
              <Text lightColor="#3f3f46" style={tw`font-bold`}>
                City
              </Text>
              <Text lightColor="#737373" style={tw`text-sm mt-2 mb-3`}>
                {city}
              </Text>
            </View>
          </View>

          <View style={tw`bg-transparent px-5`}>
            {/* Total */}
            <View
              style={tw`flex-row justify-between items-center pb-3 pt-4 px-1 border-b-2 border-gray-200 dark:border-gray-800 bg-transparent`}
            >
              <View style={tw`flex-row items-center bg-transparent`}>
                <View style={tw`bg-transparent w-29 ml-3`}>
                  <Text style={tw`text-neutral-400 text-xs`}>Surcharge</Text>
                </View>
              </View>
              <View style={tw`bg-transparent`}>
                <Text>
                  <Naira style={tw`text-neutral-400 text-xs`}>
                    {processingFee}
                  </Naira>
                </Text>
              </View>
            </View>
            <View
              style={tw`flex-row justify-between items-center py-5 px-1 bg-transparent`}
            >
              <View style={tw`flex-row items-center bg-transparent`}>
                <View style={tw`bg-transparent w-29 ml-3`}>
                  <Text style={tw`font-bold`}>Total</Text>
                </View>
              </View>
              <View style={tw`bg-transparent`}>
                <Text style={tw`font-bold`}>
                  <Naira style={tw`text-neutral-600`}>{totalPriceInCart}</Naira>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Paystack Payment below. */}
        <Paystack
          paystackKey={PAYSTACK_PUBLIC_KEY}
          billingEmail={customer.email as string}
          amount={totalAmountToPay}
          onCancel={(e) => {
            // handle response here
            alert("Payment failed");
          }}
          onSuccess={(response: any) => {
            createNewOrder({
              paystack: "paystack",
              paystackData: response,
              flutterwaveData: {} as PaymentVerificationProps,
            });
          }}
          ref={paystackWebViewRef as any}
        />

        <AsyncButton
          startIcon="payment"
          isLoading={false}
          isLoadingTitle="Processing..."
          onPress={() => paystackWebViewRef.current?.startTransaction() as any}
        >
          <Text style={tw`font-semibold text-white`}>
            Pay{" "}
            <Text style={tw`font-extrabold`}>
              <Naira style={tw`text-gray-100`}>{totalAmountToPay}</Naira>
            </Text>
          </Text>
        </AsyncButton>
      </View>
    </SafeAreaView>
  );
}
