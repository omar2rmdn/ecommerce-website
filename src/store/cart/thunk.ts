import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Product } from "@/types/ecommerce";
import axios from "axios";
import { checkAxiosError } from "@/utils/is-axios-error";

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  const { rejectWithValue, getState, fulfillWithValue, signal } = thunkAPI;
  const { cart } = getState() as RootState;
  const itemsId = Object.keys(cart.items);

  if (!itemsId.length) {
    return fulfillWithValue([]);
  }

  const itemsIdFilter = itemsId.map((item) => `id=${item}`).join("&");

  try {
    const res = await axios.get<Product[]>(`/products?${itemsIdFilter}`, {
      signal,
    });
    return res.data;
  } catch (error) {
    return rejectWithValue(checkAxiosError(error));
  }
});
