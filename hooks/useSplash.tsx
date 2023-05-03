// animate-image
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  ImageSourcePropType,
} from "react-native";
import {
  getFromSecureStore,
  saveToSecureStore,
} from "../utills/secureStoreHelper";

const images: ImageSourcePropType[] = [
  require("../assets/animate-image/viss-splash-screen2.gif"),
];

const Splash: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [hasAppPlayedAnimation, setHasPlayedAnimation] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  (async () => {
    const hasPlayedAnimation = await getFromSecureStore(
      "hasAppPlayedAnimation"
    );
    setHasPlayedAnimation(hasPlayedAnimation as string)
  })();

  useEffect(() => {
    (async () => {
      if (hasAppPlayedAnimation === "YES") return;

      if (!visible) {
        // Set the opacity and scale back to their initial values
        fadeAnim.setValue(1);
        scaleAnim.setValue(1);
      } else {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Delay the execution of setVisible(false) by 1 second
          const hideTimeout = Animated.delay(1000);
          hideTimeout.start(() => {
            setVisible(false);
          });
        });
      }
      
    })();

    (async () => await saveToSecureStore("hasAppPlayedAnimation", "YES"))();
  }, [fadeAnim, hasAppPlayedAnimation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnim, z }]}>
        {images.map((source, index) => (
          <Image source={source} style={styles.image} key={index} />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 10,
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 800,
    height: 800,
    resizeMode: "contain",
  },
});

export default Splash;
