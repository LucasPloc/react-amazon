import ProductItem from './ProductItem';
import data from '../../data';

const ProductsList = () => {
  return (
    <ul className='products'>
      {data.products.map((product) => (
        <ProductItem product={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
