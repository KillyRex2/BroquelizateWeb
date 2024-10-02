import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Checkout from './Checkout'; 

const CheckoutWrapper = () => {
  return (
    <BrowserRouter>
      <Checkout />
    </BrowserRouter>
  );
};

export default CheckoutWrapper;
