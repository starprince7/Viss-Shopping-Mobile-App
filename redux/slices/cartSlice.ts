import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReduxStore } from "../../types";
import { addItemToCart, removeItemFromCart } from "../../utills/updateCartHelpers";

export interface CartItemType {
  id: string;
  key?: string;
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
    increaseItemQty: (state, action: PayloadAction<{ id: string, price: number }>) => {
      // >>> Adds Item to Cart OR Increase item Quantity.
      return addItemToCart(state, action);
    },
    decreaseItemQty: (state, action: PayloadAction<{ id: string }>) => {
      // >> Removes Item OR reduce Item quantity from cart.
      return removeItemFromCart(state, action);
    }
  },
});

// Export Actions
export const { increaseItemQty, decreaseItemQty } =
  cartSlice.actions;

// Get item quantity
export const getItemQuantityFromCart = (cart: CartState, id: string) => {
  return cart.find((item) => item.id === id)?.quantity || 0;
};

// Export Cart state selectors
type SelectCartItem = (state: ReduxStore) => CartState;
export const selectCartItems: SelectCartItem = (state) => state.Cart;

// Get Reducer from `CartSlice` and export it.
export default cartSlice.reducer;

