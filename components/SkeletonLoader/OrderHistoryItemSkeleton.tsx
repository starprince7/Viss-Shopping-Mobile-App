import tw from "twrnc";
import React from "react";
import { Text, View } from "../Themed";
import { ActivityIndicator } from "react-native";

type Props = {
  items?: number;
};

export const OrderHistoryItemSkeleton = ({ items = 5 }: Props) => {
  return (
    <>
      {Array(items)
        .fill("_")
        .map((_, i) => (
          <View
            key={i}
            style={tw`rounded-xl h-30 mt-3 bg-zinc-300 dark:bg-zinc-600`}
          >
            <ActivityIndicator
              size="small"
              color="#89A67E"
              style={tw`top-13`}
            />
          </View>
        ))}
    </>
  );
};
