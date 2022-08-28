import { BASE_URL } from "@env";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthError,
  Customer,
  LoginData,
  LoginFulfilled,
  SignupData,
  SignupFulfilled,
} from "../../types";
import { saveToSecureStore } from "../../utills/secureStoreHelper";
import axios from "axios";

interface AuthState {
  isLoading: boolean;
  error: AuthError | null | unknown;
  customerId: null | string | number;
  customer: Customer;
}

// <<< Auth Initial state >>>
const initialState: AuthState = {
  isLoading: false,
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

/* *********************** Async SignUp and LogIn functions Start ********************************* */
// *** Sign Up Customer!
export const customerSignup = createAsyncThunk(
  "customer/customerSignup",
  (data: SignupData) => {
    return axios
      .post(`${BASE_URL}/api/customer/signup`, data)
      .then((response) => response.data);
  }
);

// *** Log In Customer!
export const customerLogin = createAsyncThunk(
  "customer/customerLogin",
  (data: LoginData) => {
    return axios
      .post(`${BASE_URL}/api/customer/login`, data)
      .then((response) => response.data);
  }
);
/* *********************** Async SignUp and LogIn functions End ********************************* */

const authSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* **************** Handle Signup Life Cycle Below ******************* */
    builder.addCase(customerSignup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      customerSignup.fulfilled,
      (state, action: PayloadAction<SignupFulfilled>) => {
        state.isLoading = false;
        state.customerId = action.payload._id;
        // save authenticaton token as `auth_token` for use later
        saveToSecureStore("auth_token", action.payload.auth_token);
      }
    );
    builder.addCase(customerSignup.rejected, (state, action) => {
      state.isLoading = false;
      state.customerId = null;
      state.error = action.payload;
    });
    // End!

    /* **************** Handle Login Life Cycle Below ******************* */
    builder.addCase(customerLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      customerLogin.fulfilled,
      (state, action: PayloadAction<LoginFulfilled>) => {
        state.isLoading = false;
        state.customerId = action.payload.customer._id;
        state.customer = action.payload.customer;
        // save authenticaton token as `auth_token` for use later
        saveToSecureStore("auth_token", action.payload.auth_token);
      }
    );
    builder.addCase(customerLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // End!
  },
});

// Excport a default Reducer
export default authSlice.reducer;
