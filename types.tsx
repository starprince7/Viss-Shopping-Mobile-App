/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "./store/slices/productSlice";
import Store from "./store/store";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  HomeScreen: NavigatorScreenParams<RootTabParamList | undefined>;
  SignupScreen: undefined;
  LoginScreen: undefined;
  ProductDetail: Product;
  ShippingInfo: { isSettingsView: boolean };
  OrderSummary: undefined;
  OrderSuccessScreen: { successMessage: string };
  OrderHistory: undefined;
  SettingsScreen: undefined;
  ChangePasswordScreen: undefined;
  SearchScreen: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type MainRootTabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

// Store Type
const _Store = Store.getState();
export type ReduxStore = typeof _Store;

export type ShippingInfo = {
  _id?: string | number;
  phoneNumber: string;
  homeAddress: string;
  country: string;
  state: string;
  zipcode: string | number;
  city: string;
};

export interface Order {
  _id: string;
  orderNo: string;
  orderDate: string;
  orderDetails: Product[];
  orderTotal: number;
  sumTotal: number;
  amount: number;
  processingFee: number;
  shippingFee: number;
  customer: Customer;
  orderStatus: OrderStatus;
  paymentStatus: String;
  transactionRef: string;
  transactionReference?: string;
  isOrderFulfilled: boolean;
  orderIsFulfilledAt: string;
}

export type OrderStatus =
  | "PENDING"
  | "DELIVERED"
  | "CANCELED"
  | "REFUNDED"
  | "RETURNED";

export type Customer = {
  _id: string | number | null;
  wallet: number;
  name: { firstname: string | null; lastname: string | null };
  email: string | null;
  cart: {}[];
  isEmailVerified: boolean | null;
  isPhoneVerified: boolean | null;
  date_registered: string | null;
  verification_code: string | number | null;
  shippingInfo: ShippingInfo[];
  orderHistory: Order[];
};

export type SignupData = {
  name: { firstname: string; lastname: string };
  email: string;
  password: string;
  cart?: {}[];
  isEmailVerified?: boolean | null;
  isPhoneVerified?: boolean | null;
  date_registered?: string | null;
  verification_code?: string | number | null;
  shippingInfo?: ShippingInfo[];
  orderHistory?: Order[];
};

export type LoginData = {
  email: string;
  password: string;
};

// For Auth Slice
export type SignupApiError = {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  password: string;
};

export type SignupFulfilled = {
  msg: string;
  _id: string | number;
  auth_token: string;
};

export type LoginFulfilled = {
  customer: Customer;
  auth_token: string;
};

export type LoginApiError = string;
