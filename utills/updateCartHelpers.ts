import { PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../redux/slices/cartSlice";

export function addItemToCart(state: CartState, action: PayloadAction<any>) {
  let id = action.payload.id;
  let price = action.payload.price;

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
export function removeItemFromCart(
  state: CartState,
  action: PayloadAction<any>
) {
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
