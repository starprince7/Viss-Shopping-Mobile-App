import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";

/**
 * Header Icon component.
 */

type HeaderIconProps = {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color?: string;
  customStyle?: {};
};

export default function HeaderIcon(props: HeaderIconProps) {
  return (
    <MaterialIcons
      size={25}
      style={[
        tw`text-black  dark:text-white ml-4 rounded-full`,
        props.customStyle,
      ]}
      {...props}
    />
  );
}
