import { View, Text } from "./Themed";
import tw from "twrnc"
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import HeaderIcon from "./HeaderIcon";
import { MaterialIcons } from "@expo/vector-icons";

type AsyncButtonProps = {
    title: string;
    isLoading: boolean;
    isLoadingTitle: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    iconName: React.ComponentProps<typeof MaterialIcons>['name'];
}

const AsyncButton = ({ title, isLoading, isLoadingTitle, onPress, style, iconName }: AsyncButtonProps) => {
    return (
        (
            <>
                {
                    !isLoading
                        ? (
                            <TouchableOpacity
                                onPress={onPress}
                                style={[tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-2 px-3.5 py-3 flex-row items-center justify-between`, style]}>
                                <Text style={tw`font-bold text-white`}>{title}</Text>
                                <HeaderIcon name={iconName} customStyle={tw`text-white mx-auto ml-1.5`} />
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity
                                disabled
                                style={[tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-2 px-3.5 py-3 flex-row items-center justify-between`, style]}>
                                <Text style={tw`font-bold text-white`}>{isLoadingTitle}</Text>
                                <HeaderIcon name='hourglass-top' customStyle={tw`text-white mx-auto ml-1.5`} />
                            </TouchableOpacity>
                        )
                }
            </>
        )
    )
}

export default AsyncButton