import { memo, useEffect, useState } from "react";
import { TProduct } from "@types";
import { useAppDispatch } from "@store/hooks";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { addToCart } from "@store/cart/cartSlice";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { ProductInfo } from "@components/eCommerce";
const { maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }
      setIsBtnDisabled(true);

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
        return clearTimeout(debounce);
      }, 500);
    }, [isBtnDisabled]);

    const dispatch = useAppDispatch();
    const addCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <ProductInfo title={title} price={price} img={img} >
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "You Reach to Limit"
              : `You Can Add  ${currentRemainingQuantity} Items`}
          </p>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={addCartHandler}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading ...
              </>
            ) : (
              " Add to cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);
export default Product;
