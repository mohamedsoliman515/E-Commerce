import { TLoading } from "@customTypes/shared.types";

import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import Error from "@pages/Error";

const SkeletonTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof SkeletonTypes;
};

const Loading = ({
  status,
  error,
  children,
  type = "category",
}: LoadingProps) => {

  const ComponentSkeleton = SkeletonTypes[type];

  if (status === "pending") {
    return <ComponentSkeleton />;
  }

  if (status === "failed") {
    return (
      <div>
        <Error type="error" message={error as string} />
      </div>
    );
  }

  return <div>{children}</div>;
  
};

export default Loading;
