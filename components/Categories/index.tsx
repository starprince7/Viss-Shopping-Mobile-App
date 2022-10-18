import tw from "twrnc"
import { ScrollView, TouchableOpacity } from "react-native"

import { View, Text } from "../Themed"
import { Category } from "./Catergory"
import { useCategory } from "../../hooks/categories"
import { CategorySkeleton } from "../SkeletonLoader/Category"


export const Categories = () => {
    const { categories = new Array(5), setCategory } = useCategory()
    const skeletonCategories = Array(5).fill('')

    return (
        <View
            lightColor="#eee"
            darkColor="#1B1F22"
            style={tw`mx-4`}
        >
            <ScrollView horizontal style={tw`h-10 mt-3`} showsHorizontalScrollIndicator={false} >
                {categories.length > 0 ? (
                    categories.map(category => (
                        <TouchableOpacity onPress={() => setCategory(category.name)} key={category.name}>
                            <Category name={category.name} />
                        </TouchableOpacity>
                    ))
                ) :
                    (
                        skeletonCategories.map((_, index) => <CategorySkeleton key={index} />)
                    )}
            </ScrollView>
        </View>
    )
}