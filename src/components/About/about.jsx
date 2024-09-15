import React, { useState, useEffect } from 'react';

const About = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        '/assets/oreja.webp',
        '/assets/recomendations.webp',
        '/assets/recomendations2.webp',
        '/assets/recomendations3.webp',
        '/assets/recomendations4.webp',
        '/assets/promos.webp',
    ];

    // Función para avanzar al siguiente slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Función para retroceder al slide anterior
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Efecto para cambiar la imagen automáticamente
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000); // Cambia la imagen cada 3 segundos

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="about" className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between py-28">
            <div className="lg:w-1/2 text-center lg:text-left px-5">
                

            <div>
            <header className="flex items-center justify-between">
                <div>
                <h1 className="text-4xl font-bold mb-4 text-gold text-left">
                    Acerca de Nosotros
                </h1>
                </div>
                <div className="flex text-left w-full">
                <img 
                    src="/assets/Broquelizate-logos/icono relleno.svg" 
                    alt="Icono central" 
                    className="w-8 h-8 transform -translate-y-2" 
                />
                </div>
            </header>
            </div>

            
                <p className="mb-6 text-lg leading-relaxed text-withe">
                    En Broquelizate, creemos que un accesorio puede ser mucho más que un simple adorno.
                    Desde elegantes aretes hasta piercings únicos, estamos dedicados a ofrecerte productos de la
                    más alta calidad que reflejen tu estilo y personalidad.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                    Con años de experiencia en la industria, nuestro equipo de expertos está aquí para ayudarte a encontrar
                    el complemento perfecto que te haga sentir única y especial. Visítanos y descubre nuestra amplia colección.
                </p>
                <a href="#contact" className="inline-block px-6 py-3 border border-gold text-gold font-semibold rounded hover:bg-gold  hover:bg-yellow-500  transition duration-300">
                    Contáctanos
                </a>
            </div>

            {/* Carousel */}
            <div className="relative lg:w-1/2 w-full mt-5 lg:mt-0 px-5 overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }} >
                    {images.map((src, index) => (
                        <div key={index} className="min-w-full h-64 lg:h-96 flex-shrink-0 flex justify-center items-center">
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-64 h-64 lg:w-96 lg:h-96 object-cover rounded-lg"  
                            />
                        </div>
                    ))}
                </div>

                {/* Botones de control */}
                <button
                    className="absolute left-16 top-1/2 transform -translate-y-1/2 z-30 flex h-10 w-10 cursor-pointer items-center justify-center bg-white/30 rounded-full focus:outline-none"
                    onClick={prevSlide}
                >
                    ❮
                </button>
                <button
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 z-30 flex h-10 w-10 cursor-pointer items-center justify-center bg-white/30 rounded-full focus:outline-none"
                    onClick={nextSlide}
                >
                    ❯
                </button>
            </div>
        </section>
    );
};

export default About;
