import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import CartComponent from './CartComponent'; // Asegúrate de que la ruta sea correcta
import Checkout from '../Checkout/Checkout.jsx'; //

const CartWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/productos" element={<CartComponent />} />
        <Route path="/checkout" element={<Checkout />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default CartWrapper;
