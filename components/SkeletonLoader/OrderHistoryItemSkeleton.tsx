import tw from "twrnc";
import React from "react";
import { Text, View } from "../Themed";

type Props = {
    items?: number
}

export const OrderHistoryItemSkeleton = ({items = 5 }: Props) => {
    return (
        <>
        <Text style={tw`text-center mt-3.5`}>Loading...</Text>
        {Array(items).fill("_").map((_, i) => (
            <View key={i} style={tw`rounded-xl h-30 mt-3 bg-zinc-300 dark:bg-zinc-600`} />
        ))}
        </>
    )
}