import GridList from "@/components/common/grid-list";
import ProductCard from "@/components/ecommerce/product/product";
import Loading from "@/components/feedback/loading/loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getAllProducts,
  cleanUpProducts,
} from "@/store/products/products-slice";
import { getProducts } from "@/store/products/thunk";
import { getAllwishlist } from "@/store/wishlist/wishlist-slice";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";

const Products = () => {
  const params = useParams();
  const prefix = params.prefix as string;

  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector(getAllProducts);
  const { itemsId } = useAppSelector(getAllwishlist);

  const productInfo = records.map((p) => ({
    ...p,
    quantity: p.id ?? 0,
    isLiked: itemsId.includes(p.id),
  }));
  useEffect(() => {
    if (prefix) {
      dispatch(getProducts(prefix));
    }

    return () => {
      dispatch(cleanUpProducts());
    };
  }, [dispatch, prefix]);

  return (
    <Loading loading={loading} error={error}>
      <Container>
        <GridList
          records={productInfo}
          renderItem={(p) => <ProductCard key={p.id} {...p} />}
        />
      </Container>
    </Loading>
  );
};

export default Products;
