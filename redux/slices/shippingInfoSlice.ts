import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxStore, ShippingInfo } from "../../types";

interface ShippingInfoState {
  shippingInformation: ShippingInfo[];
  selectedShippingInformation: EmptyShippingInfo | ShippingInfo;  /* This stores information sent for order processing. */
  ShippingInformationToUpdate: EmptyShippingInfo | ShippingInfo;  /* This holds information that is about to be updated. */
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
  ShippingInformationToUpdate: {  /* Placeholder values for the update shipping info Modal. */
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
    setCurrentShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.ShippingInformationToUpdate = action.payload;
    },
  },
});

// Export these actions
export const {
  setSelected,
  setShippingInformation,
  setCurrentShippingInfo,
} = shippingInfoSlice.actions;
// Export Reducer Func.
export default shippingInfoSlice.reducer;

//> ::State selector Helpers::
type ShippingInfoSelector = (state: ReduxStore) => ShippingInfo[];
export const selectShippingInfo: ShippingInfoSelector = (state) =>
  state.ShippingInfo.shippingInformation;

type SelectedShippingInfo = (
  state: ReduxStore
) => ShippingInfo | EmptyShippingInfo;
export const selectSelectedShippingInfo: SelectedShippingInfo = (state) =>
  state.ShippingInfo.selectedShippingInformation;

type ShippingInfoToUpdate = (
  state: ReduxStore
) => ShippingInfo | EmptyShippingInfo;
export const selectShippingInfoToUpdate: ShippingInfoToUpdate = (state) =>
  state.ShippingInfo.ShippingInformationToUpdate;
