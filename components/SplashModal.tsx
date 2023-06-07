import tw from "twrnc";
import { Dimensions } from "react-native";
import LottieView from "lottie-react-native";

import { Modal, View } from "./Themed";
import { Text } from "./Themed";
import { useRef, useState } from "react";

type Props = {
  isSplashDoneShowing: boolean;
};

export default function SplashModal({ isSplashDoneShowing }: Props) {
  // start animation when splash loader is done.
  const animation = useRef(null);
  const [hasAnimationPlayedOnce, setHasAnimationPlayedOnce] = useState(false);

  const height = Dimensions.get("screen").height / 2.5;
  const width = Dimensions.get("screen").width;

  const handleAnimationFinish = () => {
    setHasAnimationPlayedOnce(true);
  };

  const isModalVisible = !(isSplashDoneShowing && hasAnimationPlayedOnce);

  return (
    <Modal visible={isModalVisible} animationType="fade">
      <View style={tw`flex-1 bg-[#1f2937] justify-center items-center`}>
        <LottieView
          autoPlay
          loop={false}
          ref={animation}
          onAnimationFinish={handleAnimationFinish}
          style={{
            width,
            height,
            backgroundColor: "#1f2937",
          }}
          source={require("../assets/animations/store.json")}
        />
        <View style={tw`bg-transparent flex-row`}>
          <Text style={tw`text-gray-500 font-semibold text-xl`}>
            Viss Store
          </Text>
        </View>
      </View>
    </Modal>
  );
}
