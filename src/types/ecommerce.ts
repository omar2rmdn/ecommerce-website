export type Category = {
  id?: number;
  title: string;
  prefix: string;
  img: string;
};

export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

export type CategoriesState = {
  records: Category[];
  loading: LoadingState;
  error: string | null;
};

export type Product = {
  id?: number;
  title: string;
  price: string;
  cat_prefix: string;
  img: string;
};

export type ProductsState = {
  records: Product[];
  loading: LoadingState;
  error: string | null;
};
