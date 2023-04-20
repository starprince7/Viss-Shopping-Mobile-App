import tw from "twrnc"
import { StyleProp, TextStyle } from "react-native";

import { View, Text } from "./Themed"

type CardProps = {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>
}

const Card = ({ children, style }: CardProps) => {
    return (
        <View
            lightColor="white"
            darkColor=""
            style={[tw`shadow rounded-2xl dark:bg-gray-800 mx-3 p-5`, style]}
        >
            {children}
        </View>
    )
}

export default Card