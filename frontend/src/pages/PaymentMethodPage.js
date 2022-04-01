import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import { CartContext } from '../context/CartContext';

const PaymentMethodPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(CartContext);
  const [paymentMethodName, setPaymentMethodName] = useState(
    state.cart.paymentMethod || 'PayPal'
  );
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!state.cart.shippingAddress) {
      navigate('/shipping');
    }
  }, [navigate, state.cart.shippingAddress]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <div className='container small-container'>
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='PayPal'
              label='PayPal'
              value='PayPal'
              checked={paymentMethodName === 'Paypal'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              id='Stripe'
              label='Stripe'
              value='Stripe'
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            ></Form.Check>
          </div>
          <div className='mb-3'>
            <Button type='submit'>Continue</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PaymentMethodPage;
