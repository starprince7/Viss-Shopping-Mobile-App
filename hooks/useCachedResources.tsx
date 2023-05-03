import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageSourcePropType, StyleSheet } from 'react-native';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          "SpaceGrotesk": require("../assets/fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf"),
          "Raleway": require("../assets/fonts/Raleway/static/Raleway-ExtraBold.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}


const images: ImageSourcePropType[] = [
  require("../assets/animate-image/viss-splash-screen2.gif"),
];

type Props = {
  showSplashScreen: boolean;
}

export const SplashScreenSecond: React.FC<Props> = ({ showSplashScreen }) => {
  const [visible, setVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    SplashScreen.hideAsync();
    if(showSplashScreen) return;
    if (!visible) {
      // Set the opacity and scale back to their initial values
      fadeAnim.setValue(0);
      scaleAnim.setValue(0);
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 5000,
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
  }, [fadeAnim, scaleAnim, visible, ]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim },
        !visible && { display: "none" },
      ]}
    >
      {images.map((source, index) => (
        <Image source={source} style={styles.image} key={index} />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 100,
    width: 600
  },
  image: {
    width: 800,
    height: 800,
    resizeMode: "contain",
  },
});
