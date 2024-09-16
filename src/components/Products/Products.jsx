import React, { useState, useEffect } from 'react';
import Cart from '../Cart/Cart.jsx';

const Productos = ({ cartCount, setCartCount }) => {
  const [productos, setProductos] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Oro 10K');
  const [lastFetchedCategory, setLastFetchedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});

  const handleIncrement = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };
  
  const handleDecrement = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  };

  const handleSelection = (producto) => {
    const isProductSelected = selectedProducts.some((p) => p._id === producto._id);
    if (isProductSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== producto._id));
      setCartCount(cartCount - 1);
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[producto._id]; // Eliminar la cantidad del producto deseleccionado
        return newQuantities;
      });
    } else {
      setSelectedProducts([...selectedProducts, producto]);
      setCartCount(cartCount + 1);
    }
  };

  const vaciarCarrito = () => {
    setSelectedProducts([]);
    setCartCount(0);
    setQuantities({}); // Reiniciar las cantidades al vaciar el carrito
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
          <img
            src="/assets/Broquelizate-logos/icono relleno.svg"
            alt="Icono derecha"
            className="w-6 h-6"
          />
        </div>
      </header>

      <div className="flex items-center justify-center pb-14">
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
      {productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {productos.map((producto) => (
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

{/* Modal para el carrito */}
{isCartModalOpen && (
  <div
    id="cartModal"
    
    className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    onClick={(e) => {
      // Close modal if clicked outside the modal content
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

      {/* Modal Header */}
      <h2 id="cartModalTitle" className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Productos seleccionados
      </h2>

      <ul id="cartModalDescription" className="space-y-4">
  {selectedProducts.map((producto) => (
    <li key={producto._id} className="relative flex items-center space-x-4 group">
      <div className="relative">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-16 h-16 rounded-lg object-cover"
          loading="lazy"
        />
        {/* Botón para eliminar producto (X) */}
        <button
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
          onClick={() => handleSelection(producto)} // Usamos la misma función para eliminar
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
      <div className="text-left">
        <p className="text-gray-800 dark:text-gray-200">{producto.nombre}</p>
        <p className="text-gray-800 dark:text-gray-200">{producto.categoria}</p>
        <p className="text-gray-600 dark:text-gray-400">${producto.precio.toFixed(2)}</p>
      </div>
      {/* Control de cantidad */}
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={() => handleDecrement(producto._id)}
          className="bg-white text-black border border-grey hover:bg-gray-200 rounded-s-lg p-3 h-11"
        >
          <svg className="w-3 h-3" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
          </svg>
        </button>
        <input
          type="text"
          value={quantities[producto._id] || 1}
          readOnly
          className="bg-white text-black border border-grey h-11 text-center w-full py-2.5"
        />
        <button
          type="button"
          onClick={() => handleIncrement(producto._id)}
          className="bg-white text-black border border-grey hover:bg-gray-200 rounded-e-lg p-3 h-11"
        >
          <svg className="w-3 h-3" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
    </li>
  ))}
</ul>

      {/* Modal Footer */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-800">
          Total: $
          {selectedProducts
          .reduce((total, producto) => total + producto.precio * (quantities[producto._id] || 1), 0)
          .toFixed(2)}
        </span>
        <div className="space-x-4">
          <button
            className="checkout-btn bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={vaciarCarrito}
            inert={isCartModalOpen ? undefined : 'true'}
          >
            Vaciar carrito
          </button>

          <button className="checkout-btn bg-green-600 text-white px-4 py-2 rounded-lg">
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
    aria-hidden="true"
    className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    onClick={(e) => {
      // Close modal if clicked outside the modal content
      if (e.target.id === "defaultModal") setIsProductModalOpen(false);
    }}
  >
    <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-600">
      <div className="flex items-start justify-between p-4 border-b border-gray-600 rounded-t">
        <h3
          id="modalTitle"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
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
        {/* Product Image */}
        <img
          src={productoSeleccionado?.imagen}
          alt={productoSeleccionado?.nombre}
          className="w-full h-48 object-cover rounded-lg mb-4"
          loading="lazy"
        />
        {/* Product Description */}
        <p
          id="modalDescription"
          className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-2"
        >
          {productoSeleccionado?.descripcion}
        </p>
        {/* Product Price */}
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
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
