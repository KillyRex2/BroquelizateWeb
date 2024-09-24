import React, { useEffect, useState } from 'react';

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Obtener el username de localStorage cuando el componente se monta
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);
  }, []); // El array vacío asegura que el efecto solo corra una vez cuando el componente se monta

  return (
<div>
  <div className="absolute top-2 right-20 flex items-center space-x-2">
    <img src="/assets/Broquelizate-logos/person.svg" alt="Avatar" className="w-6 h-6" />
    {/* Si el username existe, solo muestra el nombre del usuario */}
    <a href={username ? "/profile" : "/login"} className="text-white hover:underline">
      {username ? username : 'Iniciar sesión'}
    </a>
  </div>

  <header className="py-4 px-4 mx-auto max-w-xl lg:py-8 lg:px-2 relative">
    <div className="flex items-center justify-between">
      {/* SVG icono a la izquierda, ajustado un poco hacia arriba */}
      <img src="/assets/Broquelizate-logos/icono relleno.svg" alt="Icono izquierda" className="w-8 h-8 transform -translate-y-2" />

      {/* Logo central */}
      <div className="mx-4 text-center">
        <a href="/">
          <img src="/assets/Broquelizate-logos/logo-blanco.png" alt="Logo central" className="max-w-full h-auto rounded-lg" />
        </a>
      </div>

      {/* SVG icono a la derecha, ajustado un poco hacia arriba */}
      <img src="/assets/Broquelizate-logos/icono relleno.svg" alt="Icono derecha" className="w-8 h-8 transform -translate-y-2" />
    </div>
  </header>
</div>


    
  );
};

export default Header;
