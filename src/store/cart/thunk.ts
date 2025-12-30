import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Product } from "src/types/ecommerce";
import axios, { isAxiosError } from "axios";

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  const { rejectWithValue, getState, fulfillWithValue } = thunkAPI;
  const { cart } = getState() as RootState;
  const itemsId = Object.keys(cart.items);

  if (!itemsId.length) {
    return fulfillWithValue([]);
  }

  const itemsIdFilter = itemsId.map((item) => `id=${item}`).join("&");

  try {
    const res = await axios.get<Product[]>(`/products?${itemsIdFilter}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.message || "An unexpected error occurred");
    } else {
      return rejectWithValue("An unexpected error occurred");
    }
  }
});
