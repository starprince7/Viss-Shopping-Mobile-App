import tw from "twrnc";
import React from "react";
import { Dimensions, FlatList, Image } from "react-native";

import { Text, View } from "./Themed";
import { Order } from "../types";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/authSlice";
import { useOrderHistory } from "../hooks/useOrderHistory";
import useColorScheme from "../hooks/useColorScheme";
import { OrderHistoryItemSkeleton } from "./SkeletonLoader/OrderHistoryItemSkeleton";

export const PendingOrders = () => {
  const colorScheme = useColorScheme();
  const { customer } = useSelector(selectAuth);

  const {
    loading,
    orders = [],
    page,
    totalCount,
    hasMore,
    fetchMore,
  } = useOrderHistory({
    customerId: customer._id as string,
    limit: 10,
    status: "PENDING",
  });

  if (loading) {
    return <OrderHistoryItemSkeleton items={4} />;
  }

  const renderFlatListOrderCard = ({
    orderDetails,
    orderDate,
    orderStatus,
    orderNo,
  }: Order) => (
    <View
      key={orderNo}
      lightColor="#ffff"
      darkColor="#52525b"
      style={tw`p-1 mt-3 rounded-xl overflow-hidden`}
    >
      <View style={tw`bg-transparent p-2`}>
        <View style={tw`bg-transparent flex-row justify-between items-center`}>
          <Text style={tw`text-[14px] capitalize mb-2.5 font-semibold`}>
            #{orderNo}
          </Text>
          <View style={tw`rounded-xl bg-[#D3D3D3]`}>
            <Text
              style={tw`uppercase p-1 w-20 text-center text-[10px] font-semibold dark:text-neutral-700`}
            >
              {orderStatus}
            </Text>
          </View>
        </View>
        <View style={tw`bg-transparent flex-row items-center px-1.5`}>
          {orderDetails?.map(({ image }, index) => (
            <View
              key={index}
              style={[
                {
                  shadowColor: colorScheme === "light" ? "silver" : "#1f1b24",
                  shadowOffset: { width: 5, height: 4 },
                  shadowOpacity: 0.9,
                  shadowRadius: 10,
                  padding: 2,
                },
                tw`rounded-full mt-0.5 mb-2 mr-1.3`,
              ]}
            >
              <Image source={{ uri: image }} style={tw`h-8 w-8 rounded-lg`} />
            </View>
          ))}
        </View>
        <Text style={tw`capitalize p-1 text-xs`}>{orderDate}</Text>
      </View>
    </View>
  );

  return (
    <>
      {orders.length ? (
        <FlatList
          data={orders}
          renderItem={({ item }) => renderFlatListOrderCard(item) as any}
          keyExtractor={(item) => item._id}
          onEndReachedThreshold={-1}
          onEndReached={hasMore ? fetchMore : null}
          ListFooterComponent={
            loading ? <Text>Loading more data...</Text> : null
          }
        />
      ) : (
        <View
          lightColor="#ffff"
          darkColor="#1B1F22"
          style={tw`pr-3 mt-3 bg-transparent rounded-xl flex-row justify-between overflow-hidden`}
        >
          <Text style={tw`mx-auto mt-40  text-neutral-400 dark:text-neutral-500`}>
            You have no pending order!
          </Text>
        </View>
      )}
    </>
  );
};
