import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import AuthReducer from "./slices/authSlice";

const Store = configureStore({
  reducer: {
    Products: productReducer,
    Cart: cartReducer,
    Auth: AuthReducer,
  },
});

export default Store;
