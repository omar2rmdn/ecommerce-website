import { useEffect } from "react";
import Loading from "@/components/feedback/loading/loading";
import GridList from "@/components/common/grid-list";
import type { Product } from "src/types/ecommerce";
import ProductCard from "@/components/ecommerce/product/product";
import {
  getAllwishlist,
  wishlistCleanup,
} from "@/store/wishlist/wishlist-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCartState } from "@/store/cart/cart-slice";
import { getWishlist } from "@/store/wishlist/thunk";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productFullInfo } = useAppSelector(getAllwishlist);
  const { items } = useAppSelector(getCartState);

  useEffect(() => {
    dispatch(getWishlist());
    return () => {
      dispatch(wishlistCleanup());
    };
  }, [dispatch]);

  const records = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
    isLiked: true,
  }));

  return (
    <>
      <h1>Your Wishlist</h1>
      <Loading loading={loading} error={error}>
        <GridList<Product>
          records={records}
          renderItem={(record) => <ProductCard {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
