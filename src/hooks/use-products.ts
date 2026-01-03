import { getCartState } from "@/store/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  cleanUpProducts,
  getAllProducts,
} from "@/store/products/products-slice";
import { getProducts } from "@/store/products/thunk";
import { getAllwishlist } from "@/store/wishlist/wishlist-slice";
import { useEffect } from "react";
import { useParams } from "react-router";

export const useProducts = () => {
  const params = useParams();
  const prefix = params.prefix as string;

  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector(getAllProducts);
  const { itemsId } = useAppSelector(getAllwishlist);
  const { items: cartItems } = useAppSelector(getCartState);

  const productInfo = records.map((p) => ({
    ...p,
    quantity: cartItems[p.id] ?? 0,
    isLiked: itemsId.includes(p.id),
  }));
  useEffect(() => {
    let promise: { abort: () => void } | null = null;

    if (prefix) {
      promise = dispatch(getProducts(prefix));
    }

    return () => {
      dispatch(cleanUpProducts());
      promise?.abort();
    };
  }, [dispatch, prefix]);

  return {
    productInfo,
    error,
    loading,
    prefix,
  };
};
