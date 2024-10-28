import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './Products.jsx';
import Login from '../Login/Login.jsx'; 

const CheckoutWrapper = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} /> {/* Ruta para la página de Login */}
        {/* Otras rutas de tu aplicación */}
      </Routes>
    </Router>
  );
};

export default CheckoutWrapper;
