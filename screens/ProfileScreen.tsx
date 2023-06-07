import tw from "twrnc";
import { Alert, Image, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import { RootTabScreenProps } from "../types";
import { Text, View } from "../components/Themed";
import LinkScreen from "../components/Link";
import { useSelector } from "react-redux";
import { loggoutCustomer, selectAuth } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import Naira from "../components/FormatToNaira";

export default function ProfileScreen({}: RootTabScreenProps<"Home">) {
  const { customer } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleLoggout = () => {
    Alert.alert(
      "Attention!",
      "You are about to sign out?",
      [
        {
          text: "YES",
          onPress: () => {
            dispatch(loggoutCustomer());
            dispatch(clearCart());
          },
          style: "cancel",
        },
        {
          text: "NO",
          onPress: () => null,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View lightColor="#ffff" darkColor="#404040" style={tw`flex-1`}>
      <Image
        style={tw`h-[30%] w-full bg-[#89A67E] `}
        source={require("../assets/images/shattered-dark.png")}
      />
      <View style={tw`absolute top-0 z-10 bg-purple-300 h-[28%]`}>
        <View
          style={tw`bg-transparent flex-row items-center py-5 absolute bottom-0 left-7`}
        >
          <View
            style={tw`flex-row items-end bg-transparent absolute -top-16 ${Platform.OS === "ios" ? "-right-16" : "-right-20"}`}
          >
            <MaterialIcons
              size={14}
              name="account-balance-wallet"
              style={tw`text-gray-300`}
            />
            <Text
              style={tw`ml-1 text-gray-100 text-sm font-semibold flex-row items-start`}
            >
              <Naira style={tw`text-gray-300`}>{customer.wallet || 0}</Naira>
            </Text>
          </View>
          <Image
            style={tw`w-15 h-15 rounded-full`}
            source={require("../assets/images/avatar.png")}
          />
          <View style={tw`bg-transparent ml-4`}>
            <Text style={tw`font-extrabold text-lg text-white`}>
              {customer.name.firstname} {customer.name.lastname}
            </Text>
            <Text style={tw`text-gray-100 font-semibold mb-2`}>
              {customer.email}
            </Text>
          </View>
        </View>
      </View>
      <View
        lightColor="#eee"
        darkColor="#3f3f46"
        style={tw`flex-1 rounded-t-2xl px-7 h-[65%] bg-transparent -mt-0 justify-center`}
      >
        <SafeAreaView style={tw`h-auto mb-60 `}>
          <LinkScreen
            title="Order History"
            to={"OrderHistory"}
            iconName="store"
          />
          <LinkScreen
            title="Notifications"
            // to={"SettingsScreen"}
            iconName="notifications"
            onPress={() => Alert.alert("You don't have any notification.")}
          />
          <LinkScreen
            title="Settings"
            to={"SettingsScreen"}
            iconName="settings"
          />
          <LinkScreen
            title="sign Out"
            iconName="logout"
            onPress={handleLoggout}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
