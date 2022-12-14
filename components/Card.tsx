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
            darkColor="#3f3f46"
            style={[tw`shadow rounded-2xl mx-5 px-3`, style]}
        >
            {children}
        </View>
    )
}

export default Card