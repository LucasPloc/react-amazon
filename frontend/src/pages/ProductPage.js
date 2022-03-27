import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { slug } = useParams();
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
};

export default ProductPage;
