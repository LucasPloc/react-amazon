import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const SignUpPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';

  const { state, dispatch: ctxDispatch } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        email,
        name,
        password,
        confirmPassword,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (state.userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, state.userInfo]);
  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className='my-3'>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoComplete
            onChange={(e) => setName(e.target.value)}
            type='text'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoComplete
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoComplete
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            autoComplete
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            required
          />
        </Form.Group>
        <div className='mb-3'>
          <Button type='submit'>Sign Up</Button>
        </div>
        <div className='mb-3'>
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpPage;
