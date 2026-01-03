import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "@/types/ecommerce";
import { checkAxiosError } from "@/utils/is-axios-error";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const res = await axios.get<Product[]>(`/products?cat_prefix=${prefix}`, {
        signal,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(checkAxiosError(error));
    }
  }
);
