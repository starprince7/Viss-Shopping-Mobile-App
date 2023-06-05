import tw from 'twrnc'
import { TouchableOpacity } from "react-native";
import { Text } from "./Themed";

const data = ["Nigeria", "London"];

type Props = {
    handleSelect: (arg: string) => void;
}

export default function RenderCountries({ handleSelect }: Props) {
  return (
    <>
      <Text style={tw`text-lg ml-3 text-gray-300 dark:text-gray-500 mb-5`}>Countries</Text>
      {data.map((item) => (
        <TouchableOpacity
          onPress={() => handleSelect(item)}
          key={item}
          style={tw`border-b p-2 border-zinc-100 mx-3 dark:border-gray-600`}
        >
          <Text style={tw`text-gray-700 dark:text-gray-300`}>{item}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
}
