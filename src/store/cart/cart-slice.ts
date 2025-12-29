import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "src/types/ecommerce";

const initialState: CartState = {
  items: {},
  productFullInfo: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
      console.log(state.items[id]);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
