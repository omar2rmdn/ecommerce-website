import type { LoadingState } from "src/types/ecommerce";
import CartSkeleton from "../skeletons/cart-skeleton";
import CategorySkeleton from "../skeletons/category-skeleton";
import ProductSkeleton from "../skeletons/product-skeleton";

type LoadingProps = {
  loading: LoadingState;
  error: null | string;
  children: React.JSX.Element;
  type?: "cart" | "category" | "product" | null;
};

const LoadingSkeleton = (type: "cart" | "category" | "product" | null) => {
  return type === "cart" ? (
    <CartSkeleton />
  ) : type === "category" ? (
    <CategorySkeleton />
  ) : type === "product" ? (
    <ProductSkeleton />
  ) : null;
};

const Loading = ({ loading, error, children, type }: LoadingProps) => {
  if (loading === "pending") {
    return LoadingSkeleton(type ?? "product");
  }

  if (loading === "failed") {
    return <div>{error}</div>;
  }

  return <div>{children}</div>;
};

export default Loading;
