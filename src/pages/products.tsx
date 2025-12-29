import GridList from "@/components/common/grid-list";
import ProductCard from "@/components/ecommerce/product/product";
import Loading from "@/components/feedback/loading/loading";
import {
  getAllProducts,
  cleanUpProducts,
} from "@/store/products/products-slice";
import { getProducts } from "@/store/products/thunk";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const Products = () => {
  const params = useParams();
  const prefix = params.prefix as string;

  const dispatch: AppDispatch = useDispatch();
  const { records, error, loading } = useSelector(getAllProducts);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const productInfo = records.map((p) => ({
    ...p,
    quantity: p.id ? cartItems[p.id] || 0 : 0,
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
