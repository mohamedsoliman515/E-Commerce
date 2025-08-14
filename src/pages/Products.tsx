import useProducts from "@hooks/useProducts";
import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedBack";
import { GridList, Heading } from "@components/common";

const Products = () => {
 
const { loading, error, productsFullInfo, productsPrefix } = useProducts();


  return (
    <Container>
      <Heading title={`${productsPrefix} Products`} />
      <Loading status={loading} error={error} type="product">
        <GridList
          records={productsFullInfo??[]}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
