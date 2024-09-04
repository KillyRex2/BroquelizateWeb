
import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import './ProductosSwiper.css'

const ProductosSwiper = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Oro 10K');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  let lastFetchedCategory = null;
  const handleSelection = (index) => {
    // Si ya está seleccionado y se hace clic de nuevo, deselecciona
    if (selectedProductIndex === index) {
      setSelectedProductIndex(null);
    } else {
      setSelectedProductIndex(index);
    }
  };

  async function fetchFilteredProducts(categoria) {
    if (categoria === lastFetchedCategory) {
      console.log(`La categoría no ha cambiado: ${categoria}. Omitiendo la carga.`);
      return;
    }

    lastFetchedCategory = categoria;

    try {
      const response = await fetch(`http://localhost:3000/productos?categoria=${encodeURIComponent(categoria)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProductos(data);
      //isSelected(null);
      setSelectedProductIndex(null);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  useEffect(() => {
    fetchFilteredProducts(categoriaSeleccionada);
  }, [categoriaSeleccionada]);

  useEffect(() => {
    if (productos.length > 0) {
      const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
      swiper.update(); // Actualiza Swiper para reflejar los cambios en la UI
    }
  }, [productos]);

  return (
    <div>
      <div className="flex items-center justify-center pb-14" >
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

      <div className="swiper-container">
      <div className="swiper-wrapper">
          {productos.map((producto, index) => (
            <div
              className="swiper-slide flex flex-col rounded-xl bg-white text-gray-700 shadow-md transform transition-transform duration-500 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50"
              key={index}
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
                <p className="block text-base leading-relaxed text-inherit">
                  ${producto.precio.toFixed(2)}
                </p>
                <p className="block font-bold leading-relaxed text-inherit">
                  {producto.categoria}
                </p>
              </div>
              <div className="p-6 pt-0 flex justify-between items-center">
                <button
                  type="button"
                  className= 'rounded-lg bg-black py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all duration-300 hover:bg-yellow-500 hover:text-black'
                  onClick={() => {
                    setProductoSeleccionado(producto);
                    setIsModalOpen(true);
                    setSelectedProductIndex(index); // Actualiza el índice del producto seleccionado
                  }}
                >
                  Ver más
                </button>
                <button
                className={`rounded-lg bg-black py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all duration-300 hover:bg-yellow-500 hover:text-black ${
                  selectedProductIndex === index ? "border-2 border-green-500" : ""
                }`}
                onClick={() => handleSelection(index)} // Llama a la función de manejo de selección
              >
                <svg
                  className={`w-5 h-5 fill-current ${
                    selectedProductIndex === index ? "text-green-500" : ""
                  }`}
                  viewBox="0 0 576 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                </svg>
              </button>
              </div>
            </div>
          ))}
        </div>


  <div className="swiper-pagination"></div>
</div>

      {/* Modal */}
      {isModalOpen && (
  <div
    id="defaultModal"
    tabIndex="-1"
    aria-hidden="true"
    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center"
  >
    <div className="relative w-full max-w-lg h-auto md:h-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-600">
        <div className="flex items-start justify-between p-4 border-b border-gray-600 rounded-t">
          <h3 className="text-xl font-semibold text-white">
            {productoSeleccionado?.nombre}
          </h3>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-800 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="defaultModal"
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
        <div className="p-6 space-y-6 text-white">
          {/* Contenedor de la Imagen con Efecto de Lupa */}
          <div className="relative mx-auto mt-4 h-60 w-full max-w-md overflow-hidden rounded-xl bg-clip-border text-white shadow-lg group">
            <img
              src={productoSeleccionado?.imagen}
              alt={productoSeleccionado?.nombre}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-125"
            />
          </div>
          {/* Detalles del Producto */}
          <p className="text-base leading-relaxed">
            <strong>Descripción:</strong> {productoSeleccionado?.descripcion}
          </p>
          <p className="text-base leading-relaxed">
            <strong>Precio:</strong> ${productoSeleccionado?.precio.toFixed(2)}
          </p>
         
        </div>
        <div className="flex items-center p-6 space-x-2 border-t border-gray-600 rounded-b">
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-white bg-black hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Cerrar
          </button>
          <button
          className={`rounded-lg bg-black py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all duration-300 hover:bg-yellow-500 hover:text-black ${
            selectedProductIndex !== null ? "border-2 border-green-500" : ""
          }`}
          onClick={() => setSelectedProductIndex(selectedProductIndex)} // Asume que quieres que el botón mantenga su comportamiento anterior.
        >
          <svg
            className={`w-5 h-5 fill-current ${
              selectedProductIndex !== null ? "text-green-500" : ""
            }`}
            viewBox="0 0 576 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>
        </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductosSwiper;
