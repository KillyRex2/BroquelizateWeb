import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Navigation, Autoplay } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css'; 

const BestSelers = () => {
    const products = [
        {
            src: '/assets/recomendations.webp',
            name: 'Pulsera Eslabones Personalizada',
            price: '$450.00',
            rating: 4.5,
            reviews: 7,
            action: 'Añadir al carrito'
        },
        {
            src: '/assets/recomendations2.webp',
            name: 'Set de Earcuffs Gold',
            price: '$410.00',
            rating: 4.8,
            reviews: 28,
            action: 'Añadir al carrito'
        },
        {
            src: '/assets/recomendations3.webp',
            name: 'Collar de 6 Perlas Minimalista',
            price: '$300.00',
            rating: 4.7,
            reviews: 30,
            action: 'Añadir al carrito'
        },
        {
            src: '/assets/recomendations4.webp',
            name: 'Collar Mensaje Personalizado',
            price: '$590.00',
            rating: 4.9,
            reviews: 46,
            action: 'Elegir opciones'
        },
    ];

    return (
        <section id="bestsellers" className="py-20 text-white">
        <header className="text-center mb-10 w-full">
        <div className="flex items-center justify-center">
            <img
            src="/assets/Broquelizate-logos/icono relleno.svg"
            alt="Icono izquierda"
            className="w-6 h-6 transform -translate-y-0"
            />

            <h1 className="text-4xl font-bold text-gold mx-4 my-4">
            Destacados
            </h1>

            <img
            src="/assets/Broquelizate-logos/icono relleno.svg"
            alt="Icono derecha"
            className="w-6 h-6 transform -translate-y-0"
            />
        </div>

        <p className="text-gray-400 mb-4"> Los favoritos </p>

    <a
    href="/productos"
    className="inline-block px-6 py-3 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-900 transition duration-300"
    >
        Ver Colección
    </a>
        </header>



            {/* Contenido principal */}
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start">
                {/* Imagen estática */}
                <div className="lg:w-1/4 w-full flex justify-center lg:justify-start mb-8 lg:mb-0">
                    <img 
                        src="/assets/oreja.webp" 
                        alt="Imagen estática" 
                        className="w-full lg:w-80 h-auto object-cover rounded-lg"
                    />
                </div>

                {/* Carrusel */}
                <div className="lg:w-3/4 w-full">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={3}
                        navigation
                        autoplay={{ delay: 4000 }}
                        loop={true}
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-center bg-white text-black p-5 rounded-lg shadow-lg">
                                    <img 
                                        src={product.src} 
                                        alt={product.name} 
                                        className="w-full h-64 object-cover mb-4 rounded-lg"
                                    />
                                    <h2 className="text-lg font-bold">{product.name}</h2>
                                    <p className="text-yellow-500">
                                        {Array(Math.round(product.rating)).fill('⭐').join('')} ({product.reviews})
                                    </p>
                                    <p className="text-gray-700 font-semibold mb-4">{product.price}</p>
                                    <button className="px-4 py-2 border border-gold text-gold rounded hover:bg-gold hover:text-white transition">
                                        {product.action}
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default BestSelers;
