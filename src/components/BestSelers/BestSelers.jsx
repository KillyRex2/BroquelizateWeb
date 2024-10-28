import { Swiper, SwiperSlide } from 'swiper/react';   
import { Autoplay } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css'; 

const BestSelers = () => {
    const products = [
        {
            src: '/assets/bestsellers/ramitaOreja.jpg',
            hoverSrc: '/assets/bestsellers/ramitaVerde.jpg', // Imagen para hover
            name: 'Ramita marquesa',
            price: '$360.00',
            rating: 4.5,
            reviews: 7,
            action: 'Ver productos'
        },
        {
            src: '/assets/bestsellers/serpiente.jpg',
            hoverSrc: '/assets/bestsellers/serpienteNormal.jpg', // Imagen para hover
            name: 'Arracada serpiente',
            price: '$320.00',
            rating: 4.8,
            reviews: 28,
            action: 'Ver productos'
        },
        {
            src: '/assets/bestsellers/industrialOreja.jpg',
            hoverSrc: '/assets/bestsellers/industrial.jpg', // Imagen para hover
            name: 'Arracada',
            price: '$300.00',
            rating: 4.7,
            reviews: 30,
            action: 'Ver productos'
        },
        {
            src: '/assets/bestsellers/corazonOreja.jpg',
            hoverSrc: '/assets/bestsellers/corazon.jpg', // Imagen para hover
            name: 'Corazón piedras chico',
            price: '$380.00',
            rating: 4.9,
            reviews: 46,
            action: 'Ver productos'
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

        {/* Contenedor principal */}
<div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch lg:gap-2">
    {/* Contenedor del video estático */}
    <div className="lg:w-1/4 w-full flex justify-center  lg:mr-0 lg:flex-none">
        <video 
            src="https://firebasestorage.googleapis.com/v0/b/broquelizate-8d060.appspot.com/o/Assets%2FVideos%2Fbroquevid1.mp4?alt=media&token=366b6abf-c56f-455e-abdc-ee84df349ffe" 
            alt="Video estático" 
            className="w-full lg:w-auto h-auto object-cover rounded-lg lg:max-h-[500px]"
            autoPlay
            loop
            muted
        />
    </div>

    {/* Carrusel de productos */}
    <div className="lg:w-3/4 w-full flex justify-center">
        <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 4000 }}
            loop={true}
            className="w-full"
        >
            {products.map((product, index) => (
                <SwiperSlide key={index}>
                    <div className="flex flex-col items-center bg-white text-black p-5 rounded-lg shadow-lg h-full group">
                        <img 
                            src={product.src} 
                            alt={product.name} 
                            className="w-full h-64 object-cover mb-4 rounded-lg transition-transform duration-300 group-hover:hidden" 
                        />
                        <img 
                            src={product.hoverSrc} 
                            alt={product.name + ' hover'} 
                            className="w-full h-64 object-cover mb-4 rounded-lg transition-transform duration-300 hidden group-hover:block" 
                        />
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p className="text-yellow-500 mb-2">
                            {Array(Math.round(product.rating)).fill('⭐').join('')} ({product.reviews})
                        </p>
                        <p className="text-gray-700 font-semibold mb-4">{product.price}</p>
                        <a href="/productos" className="px-4 py-2 border border-gold text-gold rounded hover:bg-gold hover:text-white transition">
                            {product.action}
                        </a>
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
