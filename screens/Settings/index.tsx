import tw from "twrnc"
import { Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text } from "../../components/Themed"

export default function SettingsScreen() {
    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1 ${Platform.OS === 'ios' ? `pt-6` : `pt-9`}`}
            >
                <Text>Settings Screen.</Text>
            </View>
        </SafeAreaView>
    )
}