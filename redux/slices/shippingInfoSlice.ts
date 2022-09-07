import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxStore, ShippingInfo } from "../../types";

interface ShippingInfoState {
  shippingInformation: ShippingInfo[];
  selectedShippingInformation: EmptyShippingInfo | ShippingInfo;
}

type EmptyShippingInfo = {
  _id: null;
  phoneNumber: null;
  homeAddress: null;
  country: null;
  state: null;
  zipcode: null;
  city: null;
};

// Shipping Info Init State.
const initialState: ShippingInfoState = {
  shippingInformation: [],
  selectedShippingInformation: {
    _id: null,
    city: null,
    country: null,
    homeAddress: null,
    phoneNumber: null,
    state: null,
    zipcode: null,
  },
};

const shippingInfoSlice = createSlice({
  name: "shippingInformation",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<ShippingInfo>) => {
      state.selectedShippingInformation = action.payload;
    },
    setShippingInformation: (state, action: PayloadAction<ShippingInfo[]>) => {
      state.shippingInformation = action.payload;
    },
  },
});

// Export these actions
export const { setSelected, setShippingInformation } =
  shippingInfoSlice.actions;
// Export Reducer Func.
export default shippingInfoSlice.reducer;

// Selector Helper
type ShippingInfoSelector = (state: ReduxStore) => ShippingInfo[];
export const selectShippingInfo: ShippingInfoSelector = (state) => state.ShippingInfo.shippingInformation;

type SelectedShippingInfo = (state: ReduxStore) => ShippingInfo | EmptyShippingInfo;
export const selectSelectedShippingInfo: SelectedShippingInfo = (state) => state.ShippingInfo.selectedShippingInformation;
