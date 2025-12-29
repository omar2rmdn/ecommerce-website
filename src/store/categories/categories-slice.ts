import { createSlice } from "@reduxjs/toolkit";
import type { CategoriesState } from "src/types/ecommerce";
import type { RootState } from "../store";
import { getCategories } from "./thunk";

const initialState: CategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = categoriesSlice.actions;

export const getAllCategories = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
