import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { ReduxStore } from "../../types";

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

type CartState = CartItemType[];

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

// >>>>>>>>>>>>>>>>>>>>>>>>> Utilities for Cart Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<
function addItemToCart(state: CartState, action: PayloadAction<any>) {
  let id = action.payload.id;
  let price = action.payload.price

  // Here the item is not Found inside of cart
  if (state.find((item) => item.id === id) == null) {
    return [...state, { id, price, quantity: 1 }];
  } else {
    // Here the item is found in cart
    console.log("Item exist in cart Old cart state: ", state[0].quantity);
    const new_array = state.map((item) => {
      if (item.id == id) {
        return { ...item, quantity: item.quantity + 1 };
      } else return item;
    });
    console.log("The new Array b4 returning it!", new_array[0].quantity);
    return new_array;
  }
}

// Remove from cart or Reduce Item Qty
function removeItemFromCart(state: CartState, action: PayloadAction<any>) {
  let id = action.payload.id;

  // If Item quantity is just one in cart remove it
  if (state.find((item) => item.id === id)?.quantity === 1) {
    return state.filter((item) => item.id !== id);
  } else {
    // Here Item quantity is more than one so reduce quantity
    return state.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
}
