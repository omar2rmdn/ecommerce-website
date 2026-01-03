import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "@/types/ecommerce";
import { checkAxiosError } from "@/utils/is-axios-error";

const toggleLike = createAsyncThunk(
  "wishlist/toggleLike",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const recordExist = await axios.get(`/wishlist?userId=1&productId=${id}`);

      if (recordExist.data.length > 0) {
        const wishlistItemId = recordExist.data[0].id;
        await axios.delete(`/wishlist/${wishlistItemId}`, {
          signal,
        });

        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", {
          userId: "1",
          productId: id,
        });

        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=1`
      );

      if (!userWishlist.data.length) {
        return fulfillWithValue([]);
      }

      const itemsIdFilter = (await userWishlist).data
        .map((item) => `id=${item.productId}`)
        .join("&");

      const res = await axios.get<Product[]>(`/products?${itemsIdFilter}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export { toggleLike, getWishlist };
