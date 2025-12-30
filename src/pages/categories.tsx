import GridList from "@/components/common/grid-list";
import CategoryCard from "@/components/ecommerce/category/category";
import Loading from "@/components/feedback/loading/loading";
import { getAllCategories } from "@/store/categories/categories-slice";
import { getCategories } from "@/store/categories/thunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const categories = useAppSelector(getAllCategories);
  const { records, error, loading } = categories;

  useEffect(() => {
    if (!records.length) {
      dispatch(getCategories());
    }
  }, [dispatch, records]);

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
