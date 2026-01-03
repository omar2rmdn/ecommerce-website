import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCartState } from "@/store/cart/cart-slice";
import { getCart } from "@/store/cart/thunk";
import {
  cartItemChangeQuantity,
  cartItemRemove,
} from "@/store/cart/cart-slice";
import { useCallback, useEffect } from "react";

export const useCart = () => {
  const dispatch = useAppDispatch();

  const { productFullInfo, loading, error, items } =
    useAppSelector(getCartState);

  useEffect(() => {
    const promise = dispatch(getCart());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const products = productFullInfo.map((p) => ({
    ...p,
    quantity: items[p.id ?? 0],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  return {
    products,
    loading,
    error,
    changeQuantityHandler,
    removeItemHandler,
  };
};
