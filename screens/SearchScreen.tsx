import tw from "twrnc";
import axios from "axios";
import { useState, useMemo } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { View, Text } from "../components/Themed";
import debounce from "../utills/debounce";
import { BASE_URL } from "@env";
import { Product } from "../store/slices/productSlice";
import { useNavigation } from "@react-navigation/native";
import HeaderIcon from "../components/HeaderIcon";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { getErrorMsg } from "../utills/error";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const screenWidth = Dimensions.get("screen").width;
  const searchInputWidth = (screenWidth * 66) / 100;

  const startSearch = useMemo(
    () =>
      debounce(async (text) => {
        try {
          const { data } = await axios.post(`${BASE_URL}/api/search`, {
            query: text,
          });
          setResults(data);
        } catch (e: any) {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            textBody: getErrorMsg(e).message,
          });
          console.log("ERR! Search results not found :prince:> ", e);
        }
      }, 700),
    [query]
  );

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 2) startSearch(text);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -500 : 0}
      >
        <Pressable onPress={Keyboard.dismiss} style={tw`flex-1`}>
          <View
            style={tw`flex-1 px-3 pt-2`}
            lightColor="#eee"
            darkColor="#1B1F22"
          >
            <View style={tw`flex-row items-center bg-transparent`}>
              <View
                style={tw`flex-row items-center bg-transparent border rounded-[10px] px-1.5 mt-2 mb-1c border-zinc-300 dark:border-zinc-700`}
              >
                <HeaderIcon
                  name="search"
                  customStyle={tw`mr-1 -ml-0.3 text-zinc-400 dark:text-zinc-600`}
                />
                <TextInput
                  value={query}
                  placeholder="Search for products and brands..."
                  placeholderTextColor="gray"
                  keyboardType="web-search"
                  onChangeText={handleSearch}
                  style={[tw`dark:text-white h-10 w-[${searchInputWidth}px]`,]}
                />
              </View>
              <Pressable onPress={navigation.goBack}>
                <Text
                  style={tw`font-semibold mx-3 text-zinc-600 dark:text-zinc-400`}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
            {results.length > 0 && (
              <View style={tw`bg-transparent px-2`}>
                <FlatList
                  numColumns={1}
                  data={results}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => <SearchResultItem item={item} />}
                />
              </View>
            )}
            {results.length === 0 && query !== "" && (
              <View style={tw`bg-transparent mt-40 mx-auto`}>
                <MaterialIcons
                  size={36}
                  name="report"
                  style={tw`mx-auto text-neutral-400 mb-1`}
                />
                <Text
                  style={tw`text-zinc-400 dark:text-zinc-600 font-semibold`}
                >
                  No product found!
                </Text>
              </View>
            )}
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ::> Search Result Card
type SearchResultItemProps = {
  item: Product;
};
function SearchResultItem({ item }: SearchResultItemProps) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("ProductDetail", item)}>
      <Text style={tw`mt-5 text-zinc-700 border-b-2 border-zinc-600`}>
        {item.title}
      </Text>
    </Pressable>
  );
}
