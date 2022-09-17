import tw from "twrnc"
import { Platform, SafeAreaView } from "react-native"
import { View, Text } from "../../components/Themed"

export default function ChangePasswordScreen () {
    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1 ${Platform.OS === 'ios' ? `pt-6` : `pt-9`}`}
            >
                <Text>Change Password Screen.</Text>
            </View>
        </SafeAreaView>
    )
}