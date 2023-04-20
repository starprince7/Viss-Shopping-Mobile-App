import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Customer,
  LoginApiError,
  LoginFulfilled,
  ReduxStore,
  SignupApiError,
  SignupFulfilled,
} from "../../types";
import {
  removeFromSecureStore,
  saveToSecureStore,
} from "../../utills/secureStoreHelper";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

interface AuthState {
  message: string;
  error: SignupApiError | null | unknown;
  customerId: null | string | number;
  customer: Customer;
}

// <<< Auth Initial state >>>
const initialState: AuthState = {
  message: "",
  error: null,
  customerId: null,
  customer: {
    _id: null,
    wallet: 0,
    name: {
      firstname: null,
      lastname: null,
    },
    email: null,
    cart: [],
    isEmailVerified: null,
    isPhoneVerified: null,
    date_registered: null,
    verification_code: null,
    shippingInfo: [],
    orderHistory: [],
  },
};

const authSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setSignedUpCustomer: (state, action: PayloadAction<SignupFulfilled>) => {
      state.message = action.payload.msg;
      state.customerId = action.payload._id;

      // Save auth token securely as `auth_token` for use later
      (async () => {
        await saveToSecureStore("auth_token", action.payload.auth_token);
      })()
    },
    setApiError: (state, action: PayloadAction<SignupApiError>) => {
      state.error = action.payload;
    },
    setLoggedInCustomer: (state, action: PayloadAction<LoginFulfilled>) => {
      state.customer = action.payload.customer;
      state.customerId = action.payload.customer._id;
      // Save auth securely
      (async () => {
        await saveToSecureStore("auth_token", action.payload.auth_token);
      })()
    },
    setLogInApiError: (state, action: PayloadAction<LoginApiError>) => {
      state.error = action.payload;
    },
    loggoutCustomer: (state, action: PayloadAction) => {
      let unAuthenticatedCustomer = {
        _id: null,
        wallet: 0,
        name: {
          firstname: null,
          lastname: null,
        },
        email: null,
        cart: [],
        isEmailVerified: null,
        isPhoneVerified: null,
        date_registered: null,
        verification_code: null,
        shippingInfo: [],
        orderHistory: [],
      };

      state.customerId = null;
      state.customer = unAuthenticatedCustomer;
      const rfss = async () => {
        await removeFromSecureStore("auth_token");
      };
      rfss();
      Toast.show({
        type: ALERT_TYPE.WARNING,
        // title: 'Continue shopping',
        textBody: 'You signed out!'
    })
    },
  },
});

// Excport a default Reducer
export default authSlice.reducer;
// export reducer Actions
export const {
  setSignedUpCustomer,
  setApiError,
  setLoggedInCustomer,
  setLogInApiError,
  loggoutCustomer,
} = authSlice.actions;
// Auth state selector
type AuthSelector = (state: ReduxStore) => AuthState;
export const selectAuth: AuthSelector = (state) => state.Auth;
