import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Form } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import CheckoutSteps from '../components/checkout/CheckoutSteps';

const ShippingPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(CartContext);
  const { cart } = state;

  const [fullName, setFullName] = useState(cart.shippingAddress.fullName || '');
  const [address, setAddress] = useState(cart.shippingAddress.address || '');
  const [city, setCity] = useState(cart.shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    cart.shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(cart.shippingAddress.country || '');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const shippingObj = { fullName, address, city, postalCode, country };
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: shippingObj,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(shippingObj));
    navigate('/payment');
  };
  useEffect(() => {
    if (!state.userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [state.userInfo, navigate]);
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <div className='container small-container'>
        <h1 className='my-3'>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div className='mb-3'>
            <Button variant='primary' type='submit'>
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingPage;
