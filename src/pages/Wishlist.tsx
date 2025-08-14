
import {  Heading,GridList} from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedBack";
import { TProduct } from "@types";
import useWishlist from "@hooks/useWishlist";


const Wishlist = () => {
const { loading, error, records } = useWishlist();

  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading status={loading} error={error}type="product">
        <GridList<TProduct>
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
