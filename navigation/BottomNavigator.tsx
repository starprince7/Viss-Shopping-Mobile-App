/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import tw from "twrnc";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

import { MainRootTabParamList, RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import { selectAuth } from "../store/slices/authSlice";
import { selectCartItems } from "../store/slices/cartSlice";
import { getItemsQuantity } from "../utills/sumCart";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/Auth/LoginScreen";

const BottomTab = createBottomTabNavigator<MainRootTabParamList>();

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { customerId } = useSelector(selectAuth);

  // Get Cart length
  const cart = useSelector(selectCartItems);
  const itemsInCart = getItemsQuantity(cart);

  function isCartEmptyAndIsFocused(navigation: any) {
    /* ***
     * Watch cart if empty, And check if cart is focused
     * One truthy expression is need alone.
     * `The expression below needs to resolve to true
     * before the notification badge can become hidden`.
     *
     * if the Expression is true I won't display a notification badge
     */
    return cart.length === 0 || navigation.isFocused();
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Home" /* "TabOne" */
      screenOptions={{
        tabBarItemStyle: [tw`h-96`],
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: true,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: [
          {
            position: "absolute",
            bottom: Platform.OS === "ios" ? 25 : 10,
            left: 19,
            right: 19,
            elevation: 0,
            borderRadius: 20,
          },
          tw`shadow-lg ${
            Platform.OS === "ios" ? `py-4` : `py-2 h-16`
          } px-3 bg-gray-800 dark:bg-gray-700`,
        ],
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          headerShown: false,
          tabBarActiveBackgroundColor: "#89A67E",
          tabBarItemStyle: { borderRadius: 10 },
          title: navigation.isFocused() ? "Home" : "",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />

      <BottomTab.Screen
        name="Cart" /* "TabTwo" */
        component={CartScreen}
        options={({ navigation }) =>
          ({
            headerShown: false,
            title: navigation.isFocused() ? "Bag" : "",
            tabBarBadge: isCartEmptyAndIsFocused(navigation)
              ? null
              : `${itemsInCart}`,
            tabBarActiveBackgroundColor: "#89A67E",
            tabBarItemStyle: { borderRadius: 10 },
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="shopping-bag" color={color} />
            ),
          } as BottomTabNavigationOptions)
        }
      />

      <BottomTab.Screen
        name="Profile" /* "TabTwo" */
        component={customerId !== null ? ProfileScreen : LoginScreen}
        options={({ navigation }) => ({
          headerShown: false,
          title: navigation.isFocused() ? "Profile" : "",
          tabBarActiveBackgroundColor: "#89A67E",
          tabBarItemStyle: [tw`rounded-xl`],
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account-circle" color={color} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: 0 }} {...props} />;
}
