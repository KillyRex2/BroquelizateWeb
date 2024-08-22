import React, { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/assets/oreja.webp',
    '/assets/recomendations.webp',
    '/assets/recomendations1.webp',
    '/assets/recomendations2.webp',
    '/assets/promos.webp',
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 lg:h-96 overflow-hidden">

    </div>
  );
};

export default Carousel;