import {
  KeyboardTypeOptions,
  Platform,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
} from "react-native";
import tw from "twrnc";
import { Text, View } from "./Themed";

type InputProps = {
  value?: string | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  error?: string | false | undefined;
  secureTextEntry?: boolean | undefined;
  emailApiError?: string;
  title?: string;
  placeholder?: string;
  multiline?: boolean | undefined;
};

const FormInput = ({
  multiline,
  value,
  onBlur,
  onChangeText,
  keyboardType,
  error,
  emailApiError,
  title,
  placeholder,
  secureTextEntry = false,
}: InputProps) => {
  return (
    <View style={tw`bg-transparent mb-3`}>
      <Text lightColor="#64748b" style={tw`capitalize`}>
        {title}
      </Text>
      <TextInput
        value={value}
        onBlur={onBlur}
        multiline={multiline}
        // placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={tw`dark:text-white  w-full border rounded-[10px] p-2.3 mt-2 border-gray-300 dark:border-gray-700`}
      />
      <Text style={tw`mt-2 ml-1 text-red-500 text-xs`}>
        {!emailApiError ? error : emailApiError}
      </Text>
    </View>
  );
};

export default FormInput;
