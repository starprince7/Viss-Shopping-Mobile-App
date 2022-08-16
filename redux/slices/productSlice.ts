import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  key?: string;
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

type Products = Product[];

const initialState: Products = [
  {
    key: "1",
    title: "Apple Mini 2",
    price: 300,
    image: "https://links.papareact.com/3pn",
    description: "This is a text description",
  },
  {
    key: "2",
    title: "Apple Mini 2",
    price: 300,
    image: "https://links.papareact.com/3pn",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sapiente velit sequi distinctio hic. Soluta aperiam quas voluptate, exercitationem iure rem explicabo neque deserunt animi, laudantium eaque quam molestiae ad!",
  },
  {
    key: "3",
    title: "Apple Mini 2",
    price: 300,
    image: "https://links.papareact.com/3pn",
    description: "This is a text description",
  },
  {
    key: "4",
    title: "Apple Mini 2",
    price: 300,
    image: "https://links.papareact.com/3pn",
    description: "This is a text description",
  },
];

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      state = action.payload;
    },
  },
});

// Export actions from navSlice
export const { setProducts } = productSlice.actions;

// Export state selectors
export const selectProducts = (state) => state.Products;

// Export reducer as default export
export default productSlice.reducer;
