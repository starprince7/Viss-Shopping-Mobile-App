import HeaderIcon from '../components/HeaderIcon';
import { Text, View } from '../components/Themed';
import tw from "twrnc"
import { SafeAreaView, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native"

type UpdateShippingInfoProps = {
    closeModal: () => void;
}

const UpdateShippingInfo = ({ closeModal }: UpdateShippingInfoProps) => {
    const navigation = useNavigation()

    /* ***
    type ShippingInfo = {
        phoneNumber: string;
        homeAddress: string;
        country: string;
        state: string;
        zipcode: number;
        city: string;
    };
*/
    
const saveUpdatedShippingInfomartion = () => {
    closeModal()
}

    return (
        <SafeAreaView style={tw`flex-1`}>
            <View
                lightColor="#eee"
                darkColor="#1B1F22"
                style={tw`flex-1 pt-6`}
            >
                <KeyboardAvoidingView
                    style={tw`flex-1`}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
                >
                    <TouchableOpacity
                        onPress={closeModal}
                        style={tw`w-10.5 ml-5 px-0.5 py-1.5 mb-3 rounded-[10px] bg-[#89A67E]`}
                    >
                        <HeaderIcon name='close' customStyle={tw`text-black mx-auto text-white`} />
                    </TouchableOpacity>
                    <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
                        <View style={tw`p-5 bg-transparent`}>
                            <Text style={tw`text-2xl font-bold`}>Update Shipping Info</Text>
                            <Text style={tw` font-semibold my-2`}>Packages are delivered using this information</Text>
                        </View>
                        {/* >>>>> Form Of Shipping Information <<<<< */}
                        <View style={tw`p-5 bg-transparent`}>
                            <View style={tw`bg-transparent mb-6`}>
                                <Text lightColor='#64748b'>Home Address</Text>
                                <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                            </View>

                            <View style={tw`bg-transparent mb-6`}>
                                <Text lightColor='#64748b'>Phone</Text>
                                <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                            </View>


                            <View style={tw`flex-row justify-between items-center bg-transparent w-50`}>
                                <View style={tw`bg-transparent mb-6 w-[80.6%] mr-1.5`}>
                                    <Text lightColor='#64748b'>State</Text>
                                    <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                                </View>
                                <View style={tw`bg-transparent mb-6 w-[80.6%] ml-1.5`}>
                                    <Text lightColor='#64748b'>Country</Text>
                                    <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                                </View>
                            </View>

                            <View style={tw`bg-transparent mb-6`}>
                                <Text lightColor='#64748b'>City</Text>
                                <TextInput style={tw` w-full border rounded-[10px] px-1.5 pb-4 pt-1 text-lg mt-2 border-gray-300 dark:border-gray-600`} />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    onPress={saveUpdatedShippingInfomartion}
                    style={tw`rounded-[10px] bg-[#89A67E] shadow-sm mx-auto mb-2 px-3.5 py-3 flex-row items-center justify-between`}>
                    <Text style={tw`font-bold text-white`}>Update</Text>
                    <HeaderIcon name='done' customStyle={tw`text-white mx-auto ml-1.5`} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default UpdateShippingInfo