import tw from "twrnc";
import { ActivityIndicator, Dimensions } from "react-native";
import { View } from "../Themed";

export const ProductComponentSkeleton = () => {
  const { width } = Dimensions.get("window");
  const halfWidth = width / 2 - 35;
  return (
    <View
      style={tw`w-[${halfWidth}px] h-40 bg-zinc-300 dark:bg-zinc-600 rounded-[10px] mx-0.5 mb-5`}
    >
      <ActivityIndicator size="small" color="#89A67E" style={tw`top-18`} />
    </View>
  );
};
