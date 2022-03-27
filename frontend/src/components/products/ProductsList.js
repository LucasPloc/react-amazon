import ProductItem from './ProductItem';

const ProductsList = ({ products }) => {
  return (
    <ul className='products'>
      {products.map((product) => (
        <ProductItem product={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
