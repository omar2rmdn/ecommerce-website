import Loading from "@/components/feedback/loading/loading";
import GridList from "@/components/common/grid-list";
import type { Product } from "@/types/ecommerce";
import ProductCard from "@/components/ecommerce/product/product";
import { useWishlist } from "@/hooks/use-wishlist";

const Wishlist = () => {
  const { records, error, loading } = useWishlist();
  return (
    <>
      <h1>Your Wishlist</h1>
      <Loading loading={loading} error={error} type="product">
        <GridList<Product>
          records={records}
          renderItem={(record) => <ProductCard {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
