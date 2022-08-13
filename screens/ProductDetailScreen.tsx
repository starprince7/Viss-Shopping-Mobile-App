import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StatusBar, TouchableOpacity } from 'react-native';
import * as Haptics from "expo-haptics"
import tw from "twrnc"

import EditScreenInfo from '../components/EditScreenInfo';
import HeaderIcon from '../components/HeaderIcon';
import { Text, View } from '../components/Themed';


export default function ProductDetailScreen() {
    const navigation = useNavigation()

    const increaseQty = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }

    const decreaseQty = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }

    return (
        <View
            style={tw`flex-1`}
            lightColor="#eee"
            darkColor="#1B1F22"
        >
            {/* >>>>>>>>>>>>>>>>>>>>> Top Navigation Icons top <<<<<<<<<<<<<<<<<<<< */}
            <View style={tw`flex flex-row bg-transparent px-5 z-50 mt-15 justify-between items-center`}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={tw`bg-white dark:bg-[#474644] shadow-xl p-2.5 rounded-full`}
                >
                    <HeaderIcon customStyle={tw`text-black dark:text-white mx-auto`} name='arrow-back' />
                </Pressable>
            </View>
            {/* >>>>>>>>>>>>>>>>>>>>> Top Navigation Icons bottom <<<<<<<<<<<<<<<<<<<< */}
            <StatusBar barStyle={'dark-content'} />
            <View style={tw`h-[51.8%] rounded-b-3xl absolute z-10 top-0 left-0 right-0`}>
                <Image
                    style={tw`w-full h-full rounded-b-3xl`}
                    source={require("../assets/images/sample-watch.jpeg")}
                />
            </View>
            <View style={tw`h-[52%] bg-gray-800 dark:bg-[#1B1F22] absolute bottom-0 left-0 right-0 px-5 pt-12`}>
                <View
                    style={tw`bg-transparent pt-2`}
                >
                    <Text style={tw`font-semibold text-2xl w-64 text-white`}>Apple Watch Mini 2</Text>
                    <View
                        style={tw`bg-transparent flex flex-row items-center mt-3`}
                    >
                        <Text style={tw`line-through mr-2 text-sm text-gray-300`}>$300</Text>
                        <Text style={tw`text-xl text-[#89A67E]`}>$200</Text>
                    </View>
                </View>
                {/* >>>> Quantity Button <<<<<<< */}
                <View
                    style={tw`absolute right-8 top-13 bg-[#89A67E] py-1 w-10 rounded-3xl flex justify-center items-center`}>
                    <TouchableOpacity onPress={increaseQty}><Text style={tw`w-full py-2 px-3.5 text-white`}>+</Text></TouchableOpacity>
                    <Text style={tw`w-full py-1.5 text-center text-white`}>1</Text>
                    <TouchableOpacity onPress={decreaseQty}><Text style={tw`w-full py-2 px-3.5 text-white`}>-</Text></TouchableOpacity>
                </View>
                {/* >>>> Quantity Button <<<<<<< */}
                <View style={tw`mt-10 bg-transparent`}>
                    <Text style={tw`leading-5 text-gray-200`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sapiente velit sequi distinctio hic. Soluta aperiam quas voluptate, exercitationem iure rem explicabo neque deserunt animi, laudantium eaque quam molestiae ad!
                    </Text>
                </View>
                <TouchableOpacity
                    style={tw`px-5 py-4 absolute left-[25%] bottom-9 w-50 rounded-3xl bg-[#89A67E]`}
                >
                    <Text style={tw`mx-auto text-white`}>ADD TO CART</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

