import Loading from "@/components/feedback/loading/loading";
import CartSubtotalPrice from "@/components/ecommerce/cart-subtotal-price/cart-subtotal-price";
import CartItemList from "@/components/ecommerce/cart-list/cart-list";
import { useCart } from "@/hooks/use-cart";

export default function Cart() {
  const { products, loading, error, changeQuantityHandler, removeItemHandler } =
    useCart();
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
