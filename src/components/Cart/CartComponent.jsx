import React, { useState } from 'react';
import Cart from '../Cart/Cart.jsx';
import ProductosSwiper from '../SwiperComponent/ProductosSwiper.jsx';
import Productos from '../Products/Products.jsx';

const CartComponent = () => {
    const [cartCount, setCartCount] = useState(0);

    return (
        <div>
            <Cart cartCount={cartCount} />
            <Productos cartCount={cartCount} setCartCount={setCartCount} />
        </div>
    );
};

export default CartComponent;
