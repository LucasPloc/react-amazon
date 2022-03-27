import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsList from '../components/products/ProductsList';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Featured Products</h1>
      <ProductsList products={products} />
    </>
  );
};

export default HomePage;
