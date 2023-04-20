import tw from "twrnc"

import { View, Text } from "../Themed"
import { CategoryContext, useCategory } from "../../hooks/categories"

type Props = { name: string }

export const Category = ({ name }: Props) => {
    const { category } = useCategory()

    return (
        <View
            lightColor="#eee"
            darkColor="#1B1F22"
        >
            <View
                lightColor={`${category === name ? "#89A67E" : "white"}`}
                darkColor={`${category === name ? "#89A67E" : "#52525b"}`}
                style={tw`px-3 rounded-xl flex justify-center items-center mr-2`}
            >
                <Text
                    lightColor={`${category === name ? "white" : "#404040"}`}
                    darkColor="white"
                    style={tw` font-extrabold py-2.5 capitalize`}>{name}
                </Text>
            </View>
        </View>
    )
}