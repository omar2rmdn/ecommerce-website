import { createSlice } from "@reduxjs/toolkit";
import type { ProductsState } from "src/types/ecommerce";
import type { RootState } from "../store";
import { getProducts } from "./thunk";

const initialState: ProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Logic improvement: Reset state when leaving page
    cleanUpProducts: (state) => {
      state.records = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload; // Records are now pre-filtered from server
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export const { cleanUpProducts } = productsSlice.actions;

export const getAllProducts = (state: RootState) => state.products;
export default productsSlice.reducer;
