import { BASE_URL } from "@env";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useContext } from "react";

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
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          SpaceGrotesk: require("../assets/fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf"),
          Raleway: require("../assets/fonts/Raleway/static/Raleway-ExtraBold.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        await axios.post(`${BASE_URL}/api/logs/appError`, { error: e });
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
