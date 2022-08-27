import { View, Text } from "./Themed";
import tw from "twrnc"
import { Button } from "react-native";

type ShippingInfoCardProps = {
    toggleUpdateShippingInfoModal: () => void;
}

const ShippingInfoCard = ({ toggleUpdateShippingInfoModal }: ShippingInfoCardProps) => {
    return (
        < View
            style={tw`w-full border p-5 bg-transparent border-gray-700 rounded-lg`}
        >
            <Text style={tw`mt-2 mb-1 font-semibold`}>Delivery Address</Text>
            <Text style={tw`mb-2 `}>Place holder street opp site 2</Text>
            <Text style={tw`mt-2 mb-1 font-semibold`}>Phone</Text>
            <Text style={tw`mb-2 `}>0904985085</Text>
            <Text style={tw`mt-2 mb-1 font-semibold`}>City</Text>
            <Text style={tw`mb-2 `}>Place Holder city town, Jos</Text>
            <Text style={tw`mt-2 mb-1 font-semibold`}>Country</Text>
            <Text style={tw`mb-2 `}>Nigeria</Text>
            <Text style={tw`mt-2 mb-1 font-semibold`}>Zip Code</Text>
            <Text style={tw`mb-2 `}>120120</Text>

            <Button color="#89A67E" title='Update Info' onPress={toggleUpdateShippingInfoModal} />
        </View>
    )
}

export default ShippingInfoCard