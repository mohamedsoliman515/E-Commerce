import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  productsFullInfoCleanUp,

} from "@store/cart/cartSlice";
import { resetOrderStatus } from "@store/orders/orderSlice";
const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    const promise= dispatch(actGetProductsByItems());
    return () => {
      promise.abort()
      dispatch(productsFullInfoCleanUp());
      dispatch(resetOrderStatus())
    };
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));
const placeOrderStatus=useAppSelector((state)=>state.orders.loading)
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );
const userAccessToken=useAppSelector((state)=>state.auth.accessToken)
  return { removeItemHandler, changeQuantityHandler, products, loading, error, userAccessToken, placeOrderStatus }
}

export default useCart
