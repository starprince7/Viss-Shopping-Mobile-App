import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { View, Text } from "./Themed";
import { RootStackParamList } from "../types";
import { MaterialIcons } from "@expo/vector-icons";

type LinkScreenProps = {
  title: string;
  isSettingsView?: boolean;
  to?: keyof RootStackParamList;
  onPress?: () => void | null;
  iconName: React.ComponentProps<typeof MaterialIcons>["name"];
};

const LinkScreen = ({
  title,
  to,
  iconName,
  onPress,
  isSettingsView,
}: LinkScreenProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={to ? () => navigation.navigate(to, { isSettingsView }) : onPress}
    >
      <View style={tw`bg-transparent flex-row items-center mb-8 mt-6 mb-3`}>
        <MaterialIcons
          name={iconName}
          size={25}
          style={tw`mr-4 text-zinc-700 dark:text-neutral-200`}
        />
        <Text
          style={tw`text-[15px] capitalize text-zinc-600 dark:text-neutral-50`}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LinkScreen;
