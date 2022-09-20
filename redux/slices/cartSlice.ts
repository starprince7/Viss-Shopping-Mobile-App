import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  addItemToCart,
  mergeTwoArraysWithoutDuplicates,
  removeItemFromCart,
} from "../../utills/updateCartHelpers";

import { ReduxStore } from "../../types";


export interface CartItemType {
  _id: string;
  quantity: number;
  title?: string;
  image?: string;
  brand?: string;
  price?: number;
  description?: string;
  countInStock?: number;
  category?: string;
  reviews?: number;
  date_created?: string;
}

export type CartState = CartItemType[];

const initialState: CartState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseItemQty: (state, action: PayloadAction<CartItemType>) => {
      // >>> Adds Item to Cart OR Increase item Quantity.
      return addItemToCart(state, action);
    },
    decreaseItemQty: (state, action: PayloadAction<{ _id: string }>) => {
      // >> Removes Item OR reduce Item quantity from cart.
      return removeItemFromCart(state, action);
    },
    setCartItems: (state, action: PayloadAction<CartItemType[]>) => {
      // @ts-ignore
      return mergeTwoArraysWithoutDuplicates(state, action.payload)
    },
    clearCart: (state, action: PayloadAction) => {
      return []
    }
  },
});

// Export Actions
export const { increaseItemQty, decreaseItemQty, setCartItems, clearCart } =
  cartSlice.actions;

// Get item quantity
export const getItemQuantityFromCart = (cart: CartState, id: string) => {
  return cart.find((item) => item._id === id)?.quantity || 0;
};

// Export Cart state selectors
type SelectCartItem = (state: ReduxStore) => CartState;
export const selectCartItems: SelectCartItem = (state) => state.Cart;

// Get Reducer from `CartSlice` and export it.
export default cartSlice.reducer;
