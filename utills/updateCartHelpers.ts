import { PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, CartState } from "../redux/slices/cartSlice";

export function addItemToCart(
  state: CartState,
  action: PayloadAction<CartItemType>
) {
  let id = action.payload._id;
  let price = action.payload.price;
  let product = action.payload;

  // Here the item is not Found inside of cart
  if (state.find((item) => item._id === id) == null) {
    return [...state, { ...product, quantity: 1 }];
  } else {
    // Here the item is found in cart
    console.log("Item exist in cart Old cart state: ", state[0].quantity);
    const new_array = state.map((item) => {
      if (item._id == id) {
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
  action: PayloadAction<{ _id: string }>
) {
  let id = action.payload._id;

  // If Item quantity is just one in cart remove it
  if (state.find((item) => item._id === id)?.quantity === 1) {
    return state.filter((item) => item._id !== id);
  } else {
    // Here Item quantity is more than one so reduce quantity
    return state.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
}

/* ::> Merge arrays with Duplicate values */
export function mergeTwoArraysWithoutDuplicates(
  cart: CartState,
  apiCart: CartState
) {
  const mergedCart = [...cart, ...apiCart];

  let uniqueIds: {}[] = [];
  return mergedCart.filter((item) => {
    const isDuplicate = uniqueIds.includes(item._id);

    /* Make sure there are no duplicates before returning
     * true for an element. ***/
    if (!isDuplicate) {
      uniqueIds.push(item._id);
      return true;
    }

    return false;
  });
}
