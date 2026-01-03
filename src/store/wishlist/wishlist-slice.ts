import { createSlice } from "@reduxjs/toolkit";
import type { WishlistState } from "@/types/ecommerce";
import { getWishlist, toggleLike } from "./thunk";
import type { RootState } from "@/store/store";
import { isString } from "@/types/guards";

const initialState: WishlistState = {
  itemsId: [],
  loading: "idle",
  error: null,
  productFullInfo: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistCleanup: (state) => {
      state.productFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleLike.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter(
          (item) => item !== action.payload.id
        );
        state.productFullInfo = state.productFullInfo.filter(
          (product) => product.id !== action.payload.id
        );
      }
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(toggleLike.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(getWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.productFullInfo = action.payload;
      state.itemsId = action.payload.map((product) => product.id);
    });
    builder.addCase(getWishlist.rejected, (state, action) => {
      state.loading = "failed";

      if (isString(action.payload)) {
        state.error = action.payload;
      } else {
        state.error = action.error.message || "Unknown Error";
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { wishlistCleanup } = wishlistSlice.actions;

export const getAllwishlist = (state: RootState) => state.wishlist;
export default wishlistSlice.reducer;
