import GridList from "@/components/common/grid-list";
import CategoryCard from "@/components/ecommerce/category/category";
import Loading from "@/components/feedback/loading/loading";
import { Container } from "react-bootstrap";
import { useCategories } from "@/hooks/use-categories";

const Categories = () => {
  const { records, error, loading } = useCategories();

  return (
    <Loading loading={loading} error={error}>
      <Container>
        <GridList
          records={records}
          renderItem={(c) => <CategoryCard key={c.id} {...c} />}
        />
      </Container>
    </Loading>
  );
};

export default Categories;
