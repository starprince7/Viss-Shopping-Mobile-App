/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, KeyboardAvoidingView, Platform } from 'react-native';
import tw from "twrnc"

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';

import { RootStackParamList, MainRootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ShippingInfo from '../screens/ShippingInfoScreen';
import OrderDetails from '../screens/OrderDetails';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
        <RootNavigator />
    </NavigationContainer>
  );
}


const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Non-Authenticated Navigation
 * stack.
 * If user is not authenticated show this stack.
 */

function PublicNavigator() {
  return (
    <Stack.Navigator>

    </Stack.Navigator>
  )
}

/**
 * Authenticated Navigation
 * stack.
 * If user is authenticated show this stack.
 */

function RootNavigator() {
  return (
      <Stack.Navigator>
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ShippingInfo" component={ShippingInfo} options={{ headerShown: false }} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
        <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<MainRootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"  /* "TabOne" */
      screenOptions={{
        tabBarItemStyle: [tw`h-96`],
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: [{
          position: 'absolute',
          bottom: 25,
          left: 19,
          right: 19,
          elevation: 0,
          borderRadius: 20
        }, tw`shadow-lg py-4 px-3 bg-gray-800 dark:bg-gray-700`]
      }}
    >

      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          headerShown: false,
          tabBarActiveBackgroundColor: '#89A67E',
          tabBarItemStyle: { borderRadius: 10 },
          title: navigation.isFocused() ? "Home" : "",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />

      <BottomTab.Screen
        name="Cart" /* "TabTwo" */
        component={CartScreen}
        options={({ navigation }) => ({
          headerShown: false,
          title: navigation.isFocused() ? "Baggage" : "",
          tabBarBadge: navigation.isFocused() ? null : '3',
          tabBarActiveBackgroundColor: '#89A67E',
          tabBarItemStyle: { borderRadius: 10 },
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} />,
        }
        )}
      />

      <BottomTab.Screen
        name="Profile" /* "TabTwo" */
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: navigation.isFocused() ? "Profile" : "",
          tabBarActiveBackgroundColor: '#89A67E',
          tabBarItemStyle: [tw`rounded-xl`],
          tabBarIcon: ({ color }) => <TabBarIcon name="account-circle" color={color} />,
        }
        )}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: 0 }} {...props} />;
}