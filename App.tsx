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

export default function App() {
  // From twrnc
  useDeviceContext(tw);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AlertNotificationRoot>
        <Provider store={Store}>
          <CategoryContextProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </CategoryContextProvider>
        </Provider>
      </AlertNotificationRoot>
    );
  }
}
