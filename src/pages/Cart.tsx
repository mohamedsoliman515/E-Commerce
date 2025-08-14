import { Heading } from "@components/common";

import { Loading } from "@components/feedBack";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import Error from "./Error";
import useCart from "@hooks/useCart";

const Cart = () => {
  const { removeItemHandler, changeQuantityHandler, products, loading, error } =
    useCart();
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
            <CartSubtotalPrice products={products} />
          </>
        ) : (
          <Error type="loading" message="your Cart is Empty"/>
        )}
      </Loading>
    </>
  );
};

export default Cart;
