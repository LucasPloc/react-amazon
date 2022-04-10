import { useContext } from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const MainNavbar = ({ signout }) => {
  const { state, dispatch: ctxDispatch } = useContext(CartContext);
  const { cart, userInfo } = state;
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>amazon-react</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto w-100 justify-content-end'>
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
                <Link className='dropdown-item' to='#signout' onClick={signout}>
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className='nav-link' to='/signin'>
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
