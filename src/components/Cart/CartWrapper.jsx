import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import CartComponent from './CartComponent'; // Asegúrate de que la ruta sea correcta
import Checkout from '../Checkout/Checkout.jsx'; //
import Login from '../Login/Login.jsx'; //'; //

const CartWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/productos" element={<CartComponent />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CartWrapper;
