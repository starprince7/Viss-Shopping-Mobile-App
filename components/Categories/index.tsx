import tw from "twrnc"
import { ScrollView, TouchableOpacity } from "react-native"

import { View, Text } from "../Themed"
import { Category } from "./Catergory"
import { useCategory } from "../../hooks/categories"

export const Categories = () => {
    const { categories, setCategory } = useCategory()

    return (
        <View
            lightColor="#eee"
            darkColor="#1B1F22"
        >
            <ScrollView horizontal style={tw`h-10 mt-3`} showsHorizontalScrollIndicator={false} >
                {categories?.map(category => (
                    <TouchableOpacity onPress={() => setCategory(category.name)} key={category.name}>
                        <Category name={category.name} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}