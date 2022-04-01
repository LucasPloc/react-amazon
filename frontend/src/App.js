import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LinkContainer } from 'react-router-bootstrap';
import { CartContext } from './context/CartContext';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import ShippingPage from './pages/ShippingPage';
import SignUpPage from './pages/SignUpPage';
import PaymentMethodPage from './pages/PaymentMethodPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(CartContext);
  const { cart, userInfo } = state;

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
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>amazon-react</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className='dropdown-item'
                      to='#signout'
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className='nav-link' to='/signin'>
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/' element={<HomePage />}></Route>
              <Route path='/product/:slug' element={<ProductPage />}></Route>
              <Route path='/cart' element={<CartPage />}></Route>
              <Route path='/signin' element={<SignInPage />}></Route>
              <Route path='/signup' element={<SignUpPage />}></Route>
              <Route path='/shipping' element={<ShippingPage />}></Route>
              <Route path='/payment' element={<PaymentMethodPage />}></Route>
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
