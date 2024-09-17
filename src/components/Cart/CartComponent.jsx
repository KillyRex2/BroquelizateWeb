import React, { useState, useEffect } from 'react';
import Cart from '../Cart/Cart.jsx';
import Productos from '../Products/Products.jsx';

const CartComponent = () => {
  const [cartCount, setCartCount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Cargar los productos del carrito desde localStorage al cargar la página
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setSelectedProducts(parsedCart);
      setCartCount(parsedCart.length);
    }
  }, []);

  // Actualiza el estado cuando se agregan productos
  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...selectedProducts, newProduct];
    setSelectedProducts(updatedProducts);
    setCartCount(updatedProducts.length);
    localStorage.setItem('cart', JSON.stringify(updatedProducts)); // Actualiza el localStorage
  };

  return (
    <div>
      <Cart cartCount={cartCount} selectedProducts={selectedProducts} />
      <Productos onAddProduct={handleAddProduct} />
    </div>
  );
};

export default CartComponent;
