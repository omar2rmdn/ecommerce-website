import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import type { RootState } from "../store";
import type { Product } from "src/types/ecommerce";

const toggleLike = createAsyncThunk(
  "wishlist/toggleLike",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const recordExist = await axios.get(`/wishlist?userId=1&productId=${id}`);

      if (recordExist.data.length > 0) {
        const wishlistItemId = recordExist.data[0].id;
        await axios.delete(`/wishlist/${wishlistItemId}`);

        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", {
          userId: "1",
          productId: id,
        });

        return { type: "add", id };
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else {
        return rejectWithValue("Unexpected Error");
      }
    }
  }
);

const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue } = thunkAPI;
    const { wishlist } = getState() as RootState;
    const { itemsId } = wishlist;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=1`
      );

      if (!userWishlist.data.length) {
        return fulfillWithValue([]);
      }

      const itemsIdFilter = (await userWishlist).data
        .map((item) => `id=${item}`)
        .join("&");

      const res = await axios.get<Product[]>(`/products?${itemsIdFilter}`);

      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      } else {
        return rejectWithValue("Unexpected Error");
      }
    }
  }
);

export { toggleLike, getWishlist };
