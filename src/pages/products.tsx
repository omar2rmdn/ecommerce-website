import GridList from "@/components/common/grid-list";
import ProductCard from "@/components/ecommerce/product/product";
import Loading from "@/components/feedback/loading/loading";
import { useProducts } from "@/hooks/use-products";
import { Container } from "react-bootstrap";

const Products = () => {
  const { productInfo, error, loading } = useProducts();

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
