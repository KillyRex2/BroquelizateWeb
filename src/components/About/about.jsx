import React, { useState } from 'react';

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

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <section id="about" className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between py-10">
            <div className="lg:w-1/2 text-center lg:text-left px-10">
                <h2 className="text-4xl font-bold mb-4 text-gold">Acerca de Nosotros</h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                    En Broquelizate, creemos que un accesorio puede ser mucho más que un simple adorno.
                    Desde elegantes aretes hasta piercings únicos, estamos dedicados a ofrecerte productos de la
                    más alta calidad que reflejen tu estilo y personalidad.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-300">
                    Con años de experiencia en la industria, nuestro equipo de expertos está aquí para ayudarte a encontrar
                    el complemento perfecto que te haga sentir única y especial. Visítanos y descubre nuestra amplia colección.
                </p>
                <a href="/contact" className="inline-block px-6 py-3 border border-gold text-gold font-semibold rounded hover:bg-gold hover:text-black transition duration-300">
                    Contáctanos
                </a>
            </div>

            <div className="relative lg:w-1/2 w-full mt-10 lg:mt-0 px-10 overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((src, index) => (
                        <div key={index} className="min-w-full h-64 lg:h-96 flex-shrink-0">
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    onClick={prevSlide}
                >
                    ❮
                </button>
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    onClick={nextSlide}
                >
                    ❯
                </button>
            </div>
        </section>
    );
};

export default About;
