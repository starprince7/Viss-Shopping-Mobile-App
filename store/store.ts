import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import AuthReducer from "./slices/authSlice";
import ShippingInfoReducer from "./slices/shippingInfoSlice"
import AppReducer from './slices/App'

const Store = configureStore({
  reducer: {
    App: AppReducer,
    Products: productReducer,
    Cart: cartReducer,
    Auth: AuthReducer,
    ShippingInfo: ShippingInfoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
