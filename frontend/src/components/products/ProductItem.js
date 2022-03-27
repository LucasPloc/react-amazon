import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <li className='product' key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className='product-info'>
        {' '}
        <Link to={`/product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <p>
          <strong>${product.price}</strong>
        </p>
        <button>Add to cart</button>
      </div>
    </li>
  );
};

export default ProductItem;
