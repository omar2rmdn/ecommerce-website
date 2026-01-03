import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Category } from "@/types/ecommerce";
import { checkAxiosError } from "@/utils/is-axios-error";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const res = await axios.get<Category[]>("/categories", {
        signal,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(checkAxiosError(error));
    }
  }
);
