import { createSlice } from "@reduxjs/toolkit";
import type { ProductsState } from "@/types/ecommerce";
import type { RootState } from "../store";
import { getProducts } from "./thunk";
import { isString } from "@/types/guards";

const initialState: ProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
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

      if (isString(action.payload)) {
        state.error = action.payload;
      } else {
        state.error = action.error.message || "Unknown Error";
      }
    });
  },
});

export const { cleanUpProducts } = productsSlice.actions;

export const getAllProducts = (state: RootState) => state.products;
export default productsSlice.reducer;
