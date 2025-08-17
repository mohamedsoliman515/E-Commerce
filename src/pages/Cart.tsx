import { Heading } from "@components/common";
import { Loading } from "@components/feedBack";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import Error from "./Error";
import useCart from "@hooks/useCart";

const Cart = () => {
  const {
    removeItemHandler,
    changeQuantityHandler,
    products,
    loading,
    error,
    userAccessToken,
    placeOrderStatus,
  } = useCart();
  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <Error
            type="success"
            message="Your order has been placed successfully"
          />
        ) : (
          <Error type="loading" message="your Cart is Empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
