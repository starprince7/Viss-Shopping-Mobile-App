import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReduxStore } from "../../types";

export interface Product {
  _id: string;
  title?: string;
  image?: string;
  brand?: string;
  price: number;
  description?: string;
  countInStock?: number;
  category?: string;
  reviews?: number;
  date_created?: string;
}

type Products = Product[];

const initialState: Products = [];

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductsAction: (state, action: PayloadAction<any>) => {
      return state = action.payload;
    },
  },
});

// Export actions from navSlice
export const { setProductsAction } = productSlice.actions;

// Export state selectors
type SelectProducts = (state: ReduxStore) => Products
export const selectProducts: SelectProducts = (state) => state.Products;

// Export reducer as default export
export default productSlice.reducer;
