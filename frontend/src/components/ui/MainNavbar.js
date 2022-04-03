import { useContext } from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const MainNavbar = ({ signout }) => {
  const { state, dispatch: ctxDispatch } = useContext(CartContext);
  const { cart, userInfo } = state;
  return (
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
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
