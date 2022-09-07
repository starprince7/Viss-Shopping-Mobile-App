import { BASE_URL } from "@env";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Customer,
  LoginApiError,
  LoginData,
  LoginFulfilled,
  ReduxStore,
  SignupApiError,
  SignupData,
  SignupFulfilled,
} from "../../types";
import { saveToSecureStore } from "../../utills/secureStoreHelper";
import axios from "axios";

interface AuthState {
  message: string;
  error: SignupApiError | null | unknown;
  customerId: null | string | number;
  customer: Customer;
}

// <<< Auth Initial state >>>
const initialState: AuthState = {
  message: '',
  error: null,
  customerId: null,
  customer: {
    _id: null,
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
  },
};


const authSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<SignupFulfilled>) => {
      state.message = action.payload.msg
      state.customerId = action.payload._id

      // Save auth token securely as `auth_token` for use later
      saveToSecureStore("auth_token", action.payload.auth_token);
    },
    setApiError: (state, action: PayloadAction<SignupApiError>) => {
      state.error = action.payload
    },
    setLoggedInCustomer: (state, action: PayloadAction<LoginFulfilled>) => {
      state.customer = action.payload.customer
      state.customerId = action.payload.customer._id
      // Save auth securely
      saveToSecureStore("auth_token", action.payload.auth_token)
    },
    setLogInApiError: (state, action: PayloadAction<LoginApiError>) => {
      state.error = action.payload
    }
  }
});

// Excport a default Reducer
export default authSlice.reducer;
// export reducer Actions
export const { setCustomer, setApiError, setLoggedInCustomer, setLogInApiError } = authSlice.actions
// Auth state selector
type AuthSelector = (state: ReduxStore) => AuthState;
export const selectAuth: AuthSelector = (state) => state.Auth;
