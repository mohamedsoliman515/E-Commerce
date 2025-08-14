import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";

const useProducts = () => {
  const params = useParams();
  const productsPrefix = params.prefix as string
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);

  const cartItems = useAppSelector((state) => state.cart.items)
  const whishListItemsId = useAppSelector((state) => state.wishlist.itemsId);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: whishListItemsId.includes(el.id),
  }));

  useEffect(() => {
    const promise = dispatch(actGetProductsByCatPrefix(productsPrefix));
    return () => {
      promise.abort()
      dispatch(productsCleanUp());
    };
  }, [dispatch, productsPrefix]);

  return { loading, error, productsFullInfo, productsPrefix }
}

export default useProducts
