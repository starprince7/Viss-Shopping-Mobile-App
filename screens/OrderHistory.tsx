import tw from "twrnc";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Text, View } from "../components/Themed";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { PendingOrders } from "../components/PendingOrders";
import { CompletedOrders } from "../components/CompletedOrders";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/authSlice";

type OrderTabs = "PENDING" | "DELIVERED" | "FAILED";

export default function OrderHistory() {
  const navigation = useNavigation();
  // const { customer: { orderHistory } } = useSelector(selectAuth)

  const [orderHistoryTab, setActiveHistoryTab] =
    React.useState<OrderTabs>("PENDING");

  return (
    <View lightColor="#ffff" darkColor="#404040" style={tw`flex-1`}>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1 px-5`} lightColor="#eee" darkColor="#3f3f46">
          {/* Tab Switch */}
          <View
            style={tw`flex-row justify-between items-center mt-5 mb-1 bg-transparent rounded-lg overflow-hidden`}
          >
            <TouchableOpacity
              onPress={() => setActiveHistoryTab("PENDING")}
              style={tw`${
                orderHistoryTab === "PENDING"
                  ? "bg-[#89A67E]"
                  : "bg-zinc-200 dark:bg-neutral-500"
              } w-[50%] py-3 rounded-l-lg`}
            >
              <Text
                style={tw`font-semibold mx-auto ${
                  orderHistoryTab === "PENDING" ? "text-white" : ""
                }`}
              >
                Pending Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveHistoryTab("DELIVERED")}
              style={tw`${
                orderHistoryTab === "DELIVERED"
                  ? "bg-[#89A67E]"
                  : "bg-zinc-200 dark:bg-neutral-500"
              } w-[50%] py-3 rounded-r-lg`}
            >
              <Text
                style={tw`font-semibold mx-auto ${
                  orderHistoryTab === "DELIVERED" ? "text-white" : ""
                }`}
              >
                Completed Orders
              </Text>
            </TouchableOpacity>
          </View>

          {/* Card component */}
          {orderHistoryTab === "PENDING" && <PendingOrders />}
          {orderHistoryTab === "DELIVERED" && <CompletedOrders />}
        </View>
      </SafeAreaView>
    </View>
  );
}
