import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainNavbar from './components/ui/MainNavbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from './context/CartContext';
import {
  CartPage,
  HomePage,
  PaymentMethodPage,
  PlaceOrderPage,
  ProductPage,
  ShippingPage,
  SignInPage,
  SignUpPage,
  OrderPage,
} from './pages';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(CartContext);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        {' '}
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <MainNavbar signout={signoutHandler} />
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/product/:slug' element={<ProductPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/signin' element={<SignInPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/shipping' element={<ShippingPage />} />
              <Route path='/payment' element={<PaymentMethodPage />} />
              <Route path='/placeorder' element={<PlaceOrderPage />} />
              <Route path='/order/:id' element={<OrderPage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All rights reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
