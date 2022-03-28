import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { CartContextProvider } from './context/CartContext';

ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
