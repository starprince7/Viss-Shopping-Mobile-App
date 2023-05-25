import tw from "twrnc";
import { Image, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { View, Text } from "./Themed";
import Naira from "./FormatToNaira";
import useProducts from "../hooks/useProducts";
import { Product } from "../store/slices/productSlice";
import { ProductComponentSkeleton } from "./SkeletonLoader/Product";

export default function Products() {
  const { products, isFetchingProduct } = useProducts();
  const skeletons = Array(6).fill("");

  if (isFetchingProduct) {
    return (
      <>
        <Text style={tw`dark:text-white z-10 font-semibold p-5 mx-auto`}>
          Loading...
        </Text>
        <View
          style={tw`bg-transparent flex-row flex-wrap justify-between mx-5`}
        >
          {skeletons.map((_, index) => (
            <ProductComponentSkeleton key={index} />
          ))}
        </View>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <View
        style={tw`px-5 pt-2.5 flex-1 pb-15`}
        lightColor="#eee"
        darkColor="#1B1F22"
      >
        <View style={tw`bg-transparent pt-20`}>
          <MaterialIcons
            name="category"
            color="silver"
            size={90}
            style={tw`mx-auto`}
          />
          <Text style={tw`mx-auto mt-3 text-zinc-400`}>No item found!</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={tw`px-5 pt-2.5 flex-1 pb-15`}
      lightColor="#eee"
      darkColor="#1B1F22"
    >
      <FlatList
        numColumns={2}
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ProductComponent item={item} />}
      />
    </View>
  );
}

/* ::>Product Componnent */
type Props = {
  item: Product;
};
function ProductComponent({ item }: Props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", item)}
      style={tw`mx-2 mb-5 flex-1 rounded-2xl w-[43%] shadow-sm`}
    >
      <View lightColor="white" darkColor="#52525b" style={tw`rounded-2xl h-50`}>
        <Image
          style={tw`w-full h-33 rounded-t-2xl`}
          // source={require("../assets/images/sample-watch.jpeg")} />
          source={{ uri: `${item.image}` }}
        />
        <View style={tw`px-3 pt-1.5 bg-transparent rounded-b-2xl`}>
          <Text style={tw`font-semibold`}>{item.title}</Text>
          <View style={tw`flex flex-row items-center bg-transparent py-0.5`}>
            {/* <Text style={tw`line-through mr-2 text-sm text-gray-300`}>$0.00{item.beforePrice}</Text> */}
            <Text style={tw`font-extrabold text-[#89A67E]`}>
              {item.price && (
                <Naira style={tw`text-[#89A67E]`}>{item.price}</Naira>
              )}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
