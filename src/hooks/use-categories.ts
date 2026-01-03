import { getAllCategories } from "@/store/categories/categories-slice";
import { getCategories } from "@/store/categories/thunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export const useCategories = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(getAllCategories);
  const { records, error, loading } = categories;

  useEffect(() => {
    let promise: { abort: () => void } | null = null;

    if (!records.length) {
      promise = dispatch(getCategories());
    }

    return () => {
      promise?.abort();
    };
  }, [dispatch]);

  return {
    records,
    error,
    loading,
  };
};
