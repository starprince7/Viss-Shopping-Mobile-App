import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from "react-native"
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from "react-redux"

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Store from "./redux/store"
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function App() {
  // From twrnc
  useDeviceContext(tw)
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AlertNotificationRoot>
        <Provider store={Store}>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              style={tw`flex-1`}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -10 : 0}
            >
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </Provider>
      </AlertNotificationRoot>
    );
  }
}
