import { View, Text } from "./Themed";
import tw from "twrnc"
import { Button, Pressable } from "react-native";
import { ShippingInfo } from "../types";
import HeaderIcon from "./HeaderIcon";
import { useSelector } from "react-redux";
import { selectSelectedShippingInfo, setSelected } from "../redux/slices/shippingInfoSlice";
import { useDispatch } from "react-redux";

type ShippingInfoCardProps = {
    toggleUpdateShippingInfoModal: () => void;
} & ShippingInfo

const ShippingInfoCard = (props: ShippingInfoCardProps) => {
    const { _id, toggleUpdateShippingInfoModal, homeAddress, phoneNumber, city, state, country, zipcode } = props;
    // Grab the chosen or selected shipping info by the customer.
    const SelectedShippingInfo = useSelector(selectSelectedShippingInfo)
    const dispatch = useDispatch()

    const selectThisShippingInformation = () => {
        dispatch(setSelected({
            _id,
            homeAddress,
            phoneNumber,
            city,
            country,
            state,
            zipcode
        }))
    }

    return (
        <Pressable onPress={selectThisShippingInformation}>
            < View
                style={tw`w-full border p-5 mb-5 bg-transparent border-gray-700 rounded-lg`}
            >
                {
                    SelectedShippingInfo._id === _id ? (
                        <HeaderIcon name="check-circle" customStyle={tw`text-[#89A67E] text-3xl absolute right-6 top-5`} />
                    )
                    :
                    <HeaderIcon name="circle" customStyle={tw`text-gray-300 dark:text-zinc-700 text-3xl absolute right-6 top-5`} />
                }
                <Text style={tw`mt-2 mb-1 font-semibold`}>Delivery Address</Text>
                <Text style={tw`mb-2 `}>{homeAddress}</Text>
                <Text style={tw`mt-2 mb-1 font-semibold`}>Phone</Text>
                <Text style={tw`mb-2 `}>{phoneNumber}</Text>
                <Text style={tw`mt-2 mb-1 font-semibold`}>City</Text>
                <Text style={tw`mb-2 `}>{city}</Text>
                <Text style={tw`mt-2 mb-1 font-semibold`}>Country</Text>
                <Text style={tw`mb-2 `}>{country}</Text>
                <Text style={tw`mt-2 mb-1 font-semibold`}>Zip Code</Text>
                <Text style={tw`mb-2 `}>{zipcode}</Text>

                <Button color="#89A67E" title='Update Info' onPress={toggleUpdateShippingInfoModal} />
            </View>
        </Pressable>
    )
}

export default ShippingInfoCard