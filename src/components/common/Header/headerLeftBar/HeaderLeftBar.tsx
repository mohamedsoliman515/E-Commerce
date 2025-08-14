
import { useAppSelector } from "@store/hooks";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import BasketIcon from "@assets/svg/cart.svg?react";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import styles from "./styles.module.css";

const { headerLeftBar } = styles;
const HeaderLeftBar = () => {
    const wishlistTotalQuantity = useAppSelector(
      (state) => state.wishlist.itemsId.length
    );
    const cartTotalQuantity = useAppSelector(
      getCartTotalQuantitySelector
    ) as number;
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        to="/wishlist"
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishlistIcon title="wishlist" />}
        title="Wishlist"
      />
      <HeaderCounter
        to="/cart"
        totalQuantity={cartTotalQuantity}
        svgIcon={<BasketIcon title="cart" />}
        title="Cart"
      />
    </div>
  );
}

export default HeaderLeftBar
