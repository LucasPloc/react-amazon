import { Row, Col } from 'react-bootstrap';
import ProductItem from './ProductItem';

const ProductsList = ({ products }) => {
  return (
    <Row>
      {' '}
      <ul className='products'>
        {products.map((product) => (
          <Col sm={6} md={4} lg={3} className='mb-3' key={product.slug}>
            <ProductItem product={product} />
          </Col>
        ))}
      </ul>
    </Row>
  );
};

export default ProductsList;
