import ProductItem from './ProductItem';

const ProductsList = ({ products }) => {
  return (
    <ul className='products'>
      {products.map((product) => (
        <ProductItem key={product.slug} product={product} />
      ))}
    </ul>
  );
};

export default ProductsList;
