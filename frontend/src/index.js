import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { CartContextProvider } from './context/CartContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
