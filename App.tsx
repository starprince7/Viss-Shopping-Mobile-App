import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import tw, { useDeviceContext } from "twrnc";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import Store from "./store/store";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { CategoryContextProvider } from "./hooks/categories";
import SplashModal from "./components/SplashModal";
import { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "VISS_STORE_APP_LAUNCH";

export default function App() {
  let [isSplashModalVisible, setIsSplashModalVisible] = useState(false);
  // From twrnc
  useDeviceContext(tw);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useLayoutEffect(() => {
    const appSetup = async () => {
      try {
        const storedValued = await AsyncStorage.getItem(STORAGE_KEY);
        const hasAppLaunchedBefore = JSON.parse(storedValued as string) || false;

        if (!hasAppLaunchedBefore) {
          setIsSplashModalVisible(true);
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(true));
        } else {
          setIsSplashModalVisible(false);
        }
      } catch (e) {
        alert("failed to get app launch info.");
      }
    };
    appSetup();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AlertNotificationRoot>
        <Provider store={Store}>
          <CategoryContextProvider>
            <SafeAreaProvider>
              {isSplashModalVisible && (
                <SplashModal isSplashDoneShowing={isLoadingComplete} />
              )}
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </CategoryContextProvider>
        </Provider>
      </AlertNotificationRoot>
    );
  }
}
