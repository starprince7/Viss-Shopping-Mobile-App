import tw from "twrnc"

import { View } from "../Themed"

export const CategorySkeleton = () => {
    return (
        <View
            style={tw`bg-transparent`}
        >
            <View style={tw`w-25 h-10 bg-zinc-300 dark:bg-zinc-600 rounded-[10px] mr-2`} />
        </View>
    )
}