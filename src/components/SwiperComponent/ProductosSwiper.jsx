import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

const ProductosSwiper = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Oro 10K');
  let lastFetchedCategory = null;

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

      <div className="swiper-container">
        <div className="swiper-wrapper">
          {productos.map((producto, index) => (
            <div className="swiper-slide flex flex-col rounded-xl bg-white text-gray-700 shadow-md hover:scale-105 duration-500 transition-transform" key={index}>
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
              <div className="p-6 pt-0">
                <button
                  type="button"
                  className="rounded-lg bg-black py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md hover:shadow-lg"
                >
                  Ver más.
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default ProductosSwiper;
