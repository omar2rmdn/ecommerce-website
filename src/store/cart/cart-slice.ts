import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "@/types/ecommerce";
import type { RootState } from "../store";
import { getCart } from "./thunk";
import { isString } from "@/types/guards";

const initialState: CartState = {
  items: {},
  productFullInfo: [],
  loading: "idle",
  error: null,
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
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productFullInfo = state.productFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state, action) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.productFullInfo = action.payload;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      } else {
        state.error = action.error.message || "Unknown Error";
      }
    });
  },
});

export const { addToCart, cartItemChangeQuantity, cartItemRemove } =
  cartSlice.actions;
export const getCartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
