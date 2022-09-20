import tw from "twrnc"
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import HeaderIcon from "../components/HeaderIcon";
import useColorScheme from "../hooks/useColorScheme";
import LinkScreen from "../components/Link";
import { useSelector } from "react-redux";
import { loggoutCustomer, selectAuth } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const colorScheme = useColorScheme()
  const { customer } = useSelector(selectAuth)
  const dispatch = useDispatch()

  const handleLoggout = () => {
    dispatch(loggoutCustomer())
    dispatch(clearCart())
  }

  return (
    <View
      lightColor="#ffff"
      darkColor="#404040"
      style={tw`flex-1`}
    >
      <Image
        style={tw`h-[30%] w-full bg-[#89A67E] `}
        source={require('../assets/images/shattered-dark.png')}
      />
      <View style={tw`absolute top-0 z-10 bg-purple-300 h-[28%]`}>
        <View style={tw`bg-transparent flex-row items-center py-7 absolute bottom-0 left-7.5`}>
          <Image
            style={tw`w-17 h-17 rounded-full`}
            source={require('../assets/images/girl_profile.jpg')}
          />
          <View style={tw`bg-transparent ml-4`}>
            <Text style={tw`font-extrabold text-lg text-white`}>{customer.name.firstname} {customer.name.lastname}</Text>
            <Text style={tw`text-gray-100 font-semibold`}>{customer.email}</Text>
          </View>
        </View>
      </View>
      <View
        lightColor="#eee"
        darkColor="#3f3f46"
        style={tw`flex-1 rounded-t-2xl px-7 h-[65%] -mt-4 justify-center`}>
        <SafeAreaView style={tw`h-auto mb-25`}>
          <LinkScreen
            title="Notifications"
            to={"SettingsScreen"}
            iconName="notifications"
          />
          <LinkScreen
            title="Orders"
            to={"SettingsScreen"}
            iconName="store"
          />

          <LinkScreen
            title="Settings"
            to={"SettingsScreen"}
            iconName="settings"
          />
          <LinkScreen
            title="Log Out"
            iconName="logout"
            onPress={handleLoggout}
          />

        </SafeAreaView>
      </View>
    </View>
  );
}

