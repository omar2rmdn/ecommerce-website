import type { LoadingState } from "src/types/ecommerce";

type LoadingProps = {
  loading: LoadingState;
  error: null | string;
  children: React.JSX.Element;
};

const Loading = ({ loading, error, children }: LoadingProps) => {
  if (loading === "pending") {
    return <div>loading please wait</div>;
  }
  if (loading === "failed") {
    return <div>{error}</div>;
  }
  return <div>{children}</div>;
};

export default Loading;
