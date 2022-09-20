import tw from "twrnc"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text } from "../../components/Themed"
import HeaderIcon from "../../components/HeaderIcon"
import LinkScreen from "../../components/Link"
import Card from "../../components/Card"
import useColorScheme from "../../hooks/useColorScheme"

export default function SettingsScreen() {
    const colorScheme = useColorScheme()
    return (
        <SafeAreaView style={tw`flex-1 bg-[#eee] dark:bg-[#1B1F22]`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1`}
            >
                <Card>
                    <LinkScreen
                        title="Change password"
                        to="ChangePasswordScreen"
                        iconName="vpn-key"
                    />
                    {
                        colorScheme === "light"
                            ? (
                                <LinkScreen
                                    title="Dark Mode"
                                    to={"SettingsScreen"}
                                    iconName="brightness-2"
                                />
                            )
                            : (
                                <LinkScreen
                                    title="Dark Mode"
                                    to={"SettingsScreen"}
                                    iconName="brightness-6"
                                />
                            )
                    }
                </Card>
            </View>
        </SafeAreaView>
    )
}