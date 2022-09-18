import tw from "twrnc"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text } from "../../components/Themed"
import HeaderIcon from "../../components/HeaderIcon"
import LinkScreen from "../../components/Link"
import Card from "../../components/Card"

export default function SettingsScreen() {
    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1`}
            >
                <Card>
                    <LinkScreen
                        title="Profile"
                        to={"SettingsScreen"}
                        iconName="account-circle"
                    />
                    <LinkScreen
                        title="Change password"
                        to={"SettingsScreen"}
                        iconName="vpn-key"
                    />
                </Card>
            </View>
        </SafeAreaView>
    )
}