import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart.jsx';

const Productos = ({ cartCount, setCartCount }) => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Oro 10K');
  const [lastFetchedCategory, setLastFetchedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
 

  const handleIncrement = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };
  
  const handleDecrement = (id) => {
    if (quantities[id] === 1) {
      setSelectedProducts((prevProducts) =>
        prevProducts.filter((producto) => producto._id !== id)
      );
      setQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        delete updatedQuantities[id];
        return updatedQuantities;
      });
    } else {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: (prevQuantities[id] || 1) - 1,
      }));
    }
  };

  const handleCheckout = async () => { 
    try {
      // Calcula el total de la orden sumando los precios por cantidad
      const total = selectedProducts.reduce((total, product) => {
        const quantity = quantities[product._id] || 1; // Asegurar que la cantidad tenga un valor por defecto
        const precio = product.precio || 0; // Asegurar que precio tenga un valor por defecto
        return total + (precio * quantity);
      }, 0);  // Inicializamos total en 0 para evitar NaN
  
      // Si el total es NaN, lanzar un error
      if (isNaN(total)) {
        throw new Error("El total calculado es NaN. Verifica los precios y las cantidades.");
      }
  
      // Crea el objeto de datos de la orden con los campos requeridos
      const orderData =  {
        products: selectedProducts.map(product => ({
          productId: product._id,
          quantity: quantities[product._id] || 1,
        })),
        total: total,  // Total corregido
        username: 'Killyrez2'  // Cambiado de userId a username
      };
  
      // Enviar los datos al servidor usando fetch
      const response = await fetch('http://localhost:3000/orden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      console.log('Datos de la orden:', orderData);
  
      if (response.ok) {
        const result = await response.json();
        console.log('Orden creada con éxito:', result);
  
        // Redirigir a la página de checkout
        navigate('/checkout', {
          state: { selectedProducts, total }, // Pasamos los productos seleccionados y el total
        });
      } else {
        console.error('Error al crear la orden');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };
  


  const handleSelection = (producto) => {
    const isProductSelected = selectedProducts.some((p) => p._id === producto._id);
    if (isProductSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== producto._id));
      setCartCount - 1;
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[producto._id];
        return newQuantities;
      });
    } else {
      setSelectedProducts([...selectedProducts, producto]);
      setCartCount + 1;
    }
  };

  const vaciarCarrito = () => {
    setSelectedProducts([]);
    setCartCount=0;
    setQuantities({});
  };

  async function fetchFilteredProducts(categoria) {
    if (categoria === lastFetchedCategory) {
      console.log(`La categoría no ha cambiado: ${categoria}. Omitiendo la carga.`);
      return;
    }

    setLastFetchedCategory(categoria);

    try {
      const response = await fetch(`http://localhost:3000/productos?categoria=${encodeURIComponent(categoria)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  useEffect(() => {
    fetchFilteredProducts(categoriaSeleccionada);
  }, [categoriaSeleccionada]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    const savedQuantities = JSON.parse(localStorage.getItem('quantities'));
    if (savedCart) setSelectedProducts(savedCart);
    if (savedQuantities) setQuantities(savedQuantities);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(selectedProducts));
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [selectedProducts, quantities]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProductos(productos);
    } else {
      setFilteredProductos(
        productos.filter(producto =>
          producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, productos]);

  return (
    <div>
      <header className="text-center mb-10 w-full">
        <div className="flex items-center justify-center">
          <img
            src="/assets/Broquelizate-logos/icono relleno.svg"
            alt="Icono izquierda"
            className="w-6 h-6"
          />
          <h1 className="text-4xl font-bold text-gold mx-4 my-4">Artículos</h1>
          
          <div
            className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#000000] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
          >
            <div className="flex items-center justify-center fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Isolation_Mode"
                data-name="Isolation Mode"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path
                  d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
                ></path>
              </svg>
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
                placeholder="Buscar productos..."
            />
          </div>

          <img
            src="/assets/Broquelizate-logos/icono relleno.svg"
            alt="Icono derecha"
            className="w-6 h-6"
          />
        </div>
      </header>

      <div className="flex items-center justify-center pb-14 pl-8 pr-8">
        <div className="radio-inputs">
          {['Oro 10K', 'Oro 14K', 'Oro 18K', 'Titanio', 'Acero Quirúrgico', 'Chapa 18K', 'Rodio'].map((categoria) => (
            <label className="radio" key={categoria}>
              <input
                type="radio"
                name="radio"
                value={categoria}
                checked={categoriaSeleccionada === categoria}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              />
              <span className="name">{categoria}</span>
            </label>
          ))}
        </div>
      </div>
      
      <Cart cartCount={cartCount} selectedProducts={selectedProducts} setIsModalOpen={setIsCartModalOpen} />

      {/* Mostrar los productos obtenidos */}
      {filteredProductos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-20 pl-8 pr-8">
          {filteredProductos.map((producto) => (
            <div
              className="flex flex-col rounded-xl bg-white text-gray-700 shadow-md transform transition-transform duration-500 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50"
              key={producto._id}
            >
              <div
                className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg"
                style={{
                  backgroundImage: `url('${producto.imagen}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="p-6">
                <h5 className="mb-2 block text-lg font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {producto.nombre}
                </h5>
                <p className="block text-base leading-relaxed text-inherit">${producto.precio.toFixed(2)}</p>
                <p className="block font-bold leading-relaxed text-inherit">{producto.categoria}</p>
              </div>
              <div className="p-6 pt-0 flex justify-between items-center">
                <button
                  type="button"
                  className="rounded-lg bg-black py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                  onClick={() => {
                    setProductoSeleccionado(producto);
                    setIsProductModalOpen(true);
                  }}
                >
                  Ver más
                </button>
                <button
                  className={`rounded-lg bg-black py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all duration-300 hover:bg-yellow-500 hover:text-black ${
                    selectedProducts.some(p => p._id === producto._id) ? 'border-2 border-green-500' : ''
                  }`}
                  onClick={() => handleSelection(producto)}
                >
                  <svg
                    className={`w-5 h-5 fill-current ${selectedProducts.some(p => p._id === producto._id) ? 'text-green-500' : ''}`}
                    viewBox="0 0 576 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM160 448c0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48-48-21.5-48-48zm320 0c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron productos para la categoría seleccionada.</p>
      )}

{isCartModalOpen && (
  <div
    id="cartModal"
    className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    onClick={(e) => {
      if (e.target.id === "cartModal") setIsCartModalOpen(false);
    }}
  >
    <div className="modal-content relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <button
        type="button"
        onClick={() => setIsCartModalOpen(false)}
        className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-800 hover:text-gray-300 rounded-lg text-sm p-1.5 inline-flex items-center"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Productos seleccionados</h2>

      <div className="max-h-64 overflow-y-auto">
        <ul className="space-y-4">
          {selectedProducts.map((producto) => (
            <li key={producto._id} className="flex items-center space-x-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-full rounded-lg object-cover"
                  loading="lazy"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  onClick={() => handleSelection(producto)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-gray-800">{producto.nombre}</p>
                <p className="text-gray-800">{producto.categoria}</p>
                <p className="text-gray-600">${producto.precio.toFixed(2)}</p>
              </div>
              <div className="relative flex items-end max-w-[8rem] ml-8">
                <button
                  type="button"
                  onClick={() => handleDecrement(producto._id)}
                  className="bg-white text-black border border-gray-300 hover:bg-gray-200 rounded-l-lg p-3 h-11"
                  aria-label={`Decrease quantity of ${producto.nombre}`}
                >
                  <svg className="w-3 h-3" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={quantities[producto._id] || 1}
                  readOnly
                  className="bg-white text-black border border-gray-300 h-11 text-center w-full py-2.5"
                  aria-label={`Quantity of ${producto.nombre}`}
                />
                <button
                  type="button"
                  onClick={() => handleIncrement(producto._id)}
                  className="bg-white text-black border border-gray-300 hover:bg-gray-200 rounded-r-lg p-3 h-11"
                  aria-label={`Increase quantity of ${producto.nombre}`}
                >
                  <svg className="w-3 h-3" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-800">
          Total: $
          {selectedProducts
            .reduce((total, producto) => total + producto.precio * (quantities[producto._id] || 1), 0)
            .toFixed(2)}
        </span>
        <div className="space-x-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={vaciarCarrito}
          >
            Vaciar carrito
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={handleCheckout}
          >
          Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
)}




{/* Modal para ver más detalles de un producto */}
{isProductModalOpen && (
  <div
    id="defaultModal"
    role="dialog"
    aria-labelledby="modalTitle"
    aria-describedby="modalDescription"
    className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    onClick={(e) => {
      if (e.target.id === "defaultModal") setIsProductModalOpen(false);
    }}
  >
    <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
      <div className="flex items-start justify-between p-4 border-b border-gray-600 rounded-t">
        <h3 id="modalTitle" className="text-lg font-semibold text-gray-900">
          {productoSeleccionado?.nombre}
        </h3>
        <button
          type="button"
          onClick={() => setIsProductModalOpen(false)}
          className="text-gray-400 bg-transparent hover:bg-gray-800 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="p-6">
        <img
          src={productoSeleccionado?.imagen}
          alt={productoSeleccionado?.nombre}
          className="w-full h-48 object-cover rounded-lg mb-4"
          loading="lazy"
        />
        <p id="modalDescription" className="text-base leading-relaxed text-gray-700 mb-2">
          {productoSeleccionado?.descripcion}
        </p>
        <p className="text-lg font-bold text-gray-900">
          ${productoSeleccionado?.precio.toFixed(2)}
        </p>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Productos;
