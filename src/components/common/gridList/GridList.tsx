
import Error from "@pages/Error";
import { Row, Col } from "react-bootstrap";
type GridListProps <T>= {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

type THasId={id?:number}

const GridList = <T extends THasId>({
  records,
  renderItem,
}: GridListProps<T>) => {
  const categoriesList =
    records.length > 0 ? (
      records.map((record) => (
        <Col
          xs={6}
          md={3}
          className="d-flex justify-content-center mb-5 mt-2"
          key={record.id}
        >
          {renderItem(record)}
        </Col>
      ))
    ) : (
      <Error type="empty" message="your wishlist is empty" />
    );

  return <Row>{categoriesList}</Row>;
};

export default GridList;
