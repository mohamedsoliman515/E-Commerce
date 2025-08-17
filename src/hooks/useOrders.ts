import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, resetOrderStatus } from "@store/orders/orderSlice";
import { TProduct } from "@types";
import { useEffect, useState } from "react";

const useOrders = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([])

  const dispatch = useAppDispatch();
  const { loading, error, orderList } = useAppSelector((state) => state.orders);

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort(); // Cancelling network requests when a component unmounts
      dispatch(resetOrderStatus())
    };
  }, [dispatch]);

  const viewDetailsHandler = (id: number) => {

    const productDetails = orderList.find((order) => order.id === id)

    setShowModal(true)

    const newItem = productDetails?.items ?? []

    setSelectedProduct((prev) => [...prev, ...newItem])

  };
  const closeModalHandler = () => {
    setShowModal(false)
    setSelectedProduct([])
  }
  return { showModal, loading, error, setShowModal, selectedProduct, viewDetailsHandler, closeModalHandler, orderList }
}

export default useOrders
