import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  appIsInitialized: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appInitialized: (state, action: PayloadAction<boolean>) => {
      state.appIsInitialized = action.payload;
    },
  },
});

export const { appInitialized } = appSlice.actions;
export default appSlice.reducer;
export const selectApp = (store: any) => store.App
