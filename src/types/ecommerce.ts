export type Category = {
  id: number;
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
  id: number;
  title: string;
  price: number;
  cat_prefix: string;
  max: number;
  img: string;
  quantity?: number;
};

export type ProductsState = {
  records: Product[];
  loading: LoadingState;
  error: string | null;
};

export type CartState = {
  items: { [key: string]: number };
  productFullInfo: Product[];
  loading: LoadingState;
  error: null | string;
};

export type WishlistState = {
  itemsId: number[];
  productFullInfo: Product[];
  loading: LoadingState;
  error: null | string;
};
