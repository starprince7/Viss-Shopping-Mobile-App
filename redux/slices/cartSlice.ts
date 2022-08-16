import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { ReduxStore } from "../../types";


export interface CartItemType {
  id?: string;
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

const initialState: CartState = [

{ key: '2', quantity: 10, title: 'Apple Watch Mini 2', description: 'This amazine Apple watch mini 2' },
{ key: '3', quantity: 1, title: 'Apple Watch Mini 2', description: 'This amazine Apple watch mini 2' },
];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseItemQty: (state, action: PayloadAction<any>) => {
        return updateCartItem(state, action)
    },
    decreaseItemQty: (state, action: PayloadAction<any>) => {
        console.log("Checking Current state each time: ", state[0].quantity)
        return reduceItemUpdate(state, action)
    },
    removeFromCart: () => {},
  },
});

// Export Actions
export const { increaseItemQty, decreaseItemQty, removeFromCart } =
  cartSlice.actions;


type SelectCartItem = (state: ReduxStore) => CartState
  
// Export Cart state selectors
export const selectCartItems: SelectCartItem = (state) => state.Cart;

// Get Reducer from `CartSlice` and export it.
export default cartSlice.reducer;




// >>>>>>>>>>>>>>>>>>>>>>>>> Utilities for Cart Update <<<<<<<<<<<<<<<<<<<<<<<<<<<<
function updateCartItem(state: CartState, action: PayloadAction<any>) {
    let id = action.payload.key;
    let quantity = action.payload.quantity;

    // Here the item does'nt exist inside of cart
    if (state.find((item) => item.key === id) == null) {
        return [...state, { id, quantity }];
    }
    else {
        // Here the item does exist inside of cart
        console.log("Item exist in cart Old cart state: ", state[0].quantity)
        const new_array = state.map((item) => {
            if (item.key == id) {
            return { ...item, quantity: (item.quantity + 1 )};
            } else return item;
        });
        console.log('The new Array b4 returning it!', new_array[0].quantity)
        return new_array;
    }
}


// Remove from cart or Reduce Item Qty
function reduceItemUpdate(state: CartState, action: PayloadAction<any>) {
    let id = action.payload.id;

    // If Item quantity is just one in cart remove it
    if (state.find((item) => item.key === id)?.quantity === 1) {
        return state.filter(item => item.id !== id);
    }
    else {
    // Here Item quantity is more than one so reduce quantity
        return state.map(item =>
            item.id === id
            ? {...item, quantity: item.quantity - 1}
            : item
        )
    }
}