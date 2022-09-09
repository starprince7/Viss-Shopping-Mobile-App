import tw from "twrnc"
import { Image } from "react-native"
import { View, Text } from "./Themed";
import Naira from "./FormatToNaira";

type OrderItemProps = {
    title: string;
    image: string;
    price: number;
}

const OrderItem = ({ image, title, price }: OrderItemProps) => {
    return (
        <View style={tw`flex-row justify-between items-end py-4 px-1 bg-transparent`}>
            <View style={tw`flex-row items-center bg-transparent`}>
                <Image
                    style={tw`rounded-3xl h-17 w-16 mr-3`}
                    source={{ uri: image }}
                />
                <View style={tw`bg-transparent w-29`}>
                    <Text style={tw`font-semibold`}>{title}</Text>
                </View>
            </View>
            <View style={tw`bg-transparent`}><Text style={tw`font-semibold`}><Naira style={tw`text-neutral-600 text-xs`}>{price}</Naira></Text></View>
        </View>
    )
}

export default OrderItem