/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { ColorSchemeName, KeyboardAvoidingView, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { RootStackParamList } from "../types";
import { BottomTabNavigator } from "./BottomNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import useColorScheme from "../hooks/useColorScheme";

import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ShippingInfo from "../screens/ShippingInfoScreen";
import OrderSummary from "../screens/OrderSummary";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SettingsScreen from "../screens/Settings";
import ChangePasswordScreen from "../screens/Settings/ChangePasswordScreen";
import SearchScreen from "../screens/SearchScreen";
import OrderHistory from "../screens/OrderHistory";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Authenticated Navigation
 * stack.
 * If user is authenticated show this stack.
 */

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ShippingInfo" component={ShippingInfo} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerTintColor: `${colorScheme === "light" ? "#5A6E54" : "white"}`,
        }}
      >
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{ title: "Order History" }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ title: "" }}
        />
      </Stack.Group>
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="OrderSuccessScreen"
          component={OrderSuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
