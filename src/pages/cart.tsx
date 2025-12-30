import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  cartItemChangeQuantity,
  cartItemRemove,
  getCartState,
} from "@/store/cart/cart-slice";
import { getCart } from "@/store/cart/thunk";
import Loading from "@/components/feedback/loading/loading";
import CartSubtotalPrice from "@/components/ecommerce/cart-subtotal-price/cart-subtotal-price";
import CartItemList from "@/components/ecommerce/cart-list/cart-list";

export default function Cart() {
  const dispatch = useAppDispatch();

  const { productFullInfo, loading, error, items } =
    useAppSelector(getCartState);

  useEffect(() => {
    dispatch(getCart());
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

  return (
    <>
      <h1>Your Cart</h1>
      <Loading loading={loading} error={error}>
        <>
          <CartItemList
            products={products}
            changeQuantityHandler={changeQuantityHandler}
            removeItemHandler={removeItemHandler}
          />
          <CartSubtotalPrice products={products} />
        </>
      </Loading>
    </>
  );
}
