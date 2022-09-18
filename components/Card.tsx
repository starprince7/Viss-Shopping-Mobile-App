import tw from "twrnc"
import { View, Text } from "./Themed"

type CardProps = {
    children: React.ReactNode;
}

const Card = ({ children: children }: CardProps) => {
    return (
        <View
            lightColor="white"
            darkColor="#3f3f46"
            style={tw`shadow rounded-2xl mx-5 px-3`}
        >
            {children}
        </View>
    )
}

export default Card