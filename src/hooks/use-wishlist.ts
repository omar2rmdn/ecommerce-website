import { getCartState } from "@/store/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getWishlist } from "@/store/wishlist/thunk";
import {
  getAllwishlist,
  wishlistCleanup,
} from "@/store/wishlist/wishlist-slice";
import { useEffect } from "react";

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productFullInfo } = useAppSelector(getAllwishlist);
  const { items } = useAppSelector(getCartState);

  useEffect(() => {
    const promise = dispatch(getWishlist());
    return () => {
      promise.abort();
      dispatch(wishlistCleanup());
    };
  }, [dispatch]);

  const records = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
    isLiked: true,
  }));

  return {
    records,
    error,
    loading,
  };
};
