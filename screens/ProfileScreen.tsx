import tw from "twrnc"
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootTabScreenProps } from '../types';
import { Text, View } from '../components/Themed';
import HeaderIcon from "../components/HeaderIcon";
import useColorScheme from "../hooks/useColorScheme";

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const colorScheme = useColorScheme()
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
            <Text style={tw`font-extrabold text-lg text-white`}>Violet Norman</Text>
            <Text style={tw`text-gray-100 font-semibold`}>prince@gmail.com</Text>
          </View>
        </View>
      </View>
      <View
        lightColor="#eee"
        darkColor="#27272a"
        style={tw`flex-1 rounded-t-2xl px-5 h-[65%] -mt-4 justify-center`}>
        <SafeAreaView style={tw`h-auto mb-30`}>

          <View style={tw`flex-row items-center my-4.7 bg-transparent`}>
            <HeaderIcon name='home-filled' customStyle={tw`mr-4 text-zinc-700 dark:text-neutral-200`} />
            <Text style={tw`text-[15px] text-zinc-600 dark:text-neutral-50`}>Profile</Text>
          </View>

          <View style={tw`flex-row items-center my-4.7 bg-transparent`}>
            <HeaderIcon name='storefront' customStyle={tw`mr-4 text-zinc-700  dark:text-neutral-200`} />
            <Text style={tw`text-[15px] text-zinc-600 dark:text-neutral-50`}>Orders</Text>
          </View>

          <View style={tw`flex-row items-center my-4.7 bg-transparent`}>
            <HeaderIcon name='notifications' customStyle={tw`mr-4 text-zinc-700  dark:text-neutral-200`} />
            <Text style={tw`text-[15px] text-zinc-600 dark:text-neutral-50`}>Notifications</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")} style={tw`flex-row items-center my-4.7 bg-transparent`}>
            <HeaderIcon name='settings' customStyle={tw`mr-4 text-zinc-700  dark:text-neutral-200`} />
            <Text style={tw`text-[15px] text-zinc-600 dark:text-neutral-50`}>Settings</Text>
          </TouchableOpacity>

          {
            colorScheme === "light"
              ? (
                <View style={tw`flex-row items-center my-4.7 bg-transparent`}>
                  <HeaderIcon name='brightness-2' customStyle={tw`mr-4 text-zinc-700  dark:text-neutral-200`} />
                  <Text style={tw`text-[15px] text-zinc-600 dark:text-neutral-50`}>Dark Mode</Text>
                </View>
              )
              : (
                <View style={tw`flex-row items-center my-4.7 bg-transparent`}>
                  <HeaderIcon name='brightness-6' customStyle={tw`mr-4 text-zinc-700  dark:text-neutral-200`} />
                  <Text style={tw`text-[15px] text-zinc-600 dark:text-neutral-50`}>Light Mode</Text>
                </View>
              )
          }

        </SafeAreaView>
      </View>
    </View>
  );
}

