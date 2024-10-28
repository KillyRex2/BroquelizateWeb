import React, { useEffect, useState } from 'react'; 

const Header = () => {
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Obtener el username de localStorage cuando el componente se monta
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);
  }, []);

  const handleLogout = async () => {
    try {
      // Solicitud al backend para hacer logout
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include', // Importante para incluir cookies en la solicitud
      });

      if (response.ok) {
        // Eliminar el username de localStorage
        localStorage.removeItem('username');
        setUsername(''); // Limpiar el username en el estado
        // Redirigir al usuario a la página de login
        window.location.href = '/login';
      } else {
        console.error('Error al hacer logout');
      }
    } catch (error) {
      console.error('Error en la solicitud de logout:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className="absolute top-4 left-80 flex items-center space-x-2 relative">
        <img src="/assets/Broquelizate-logos/person.svg" alt="Avatar" className="w-6 h-6" />
        
        {username ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="text-white hover:underline focus:outline-none">
              {username}
            </button>

            {showDropdown && (
              <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <a href="/profile" className="block px-4 py-2 text-black hover:bg-gray-200">Perfil</a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-black hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="text-white hover:underline">Iniciar sesión</a>
        )}
      </div>

      <header className="py-4 px-4 mx-auto max-w-xl lg:py-8 lg:px-2 relative">
        <div className="flex items-center justify-between">
          <img src="/assets/Broquelizate-logos/icono relleno.svg" alt="Icono izquierda" className="w-8 h-8 transform -translate-y-2" />

          <div className="mx-4 text-center">
            <a href="/">
              <img src="/assets/Broquelizate-logos/logo-blanco.png" alt="Logo central" className="max-w-full h-auto rounded-lg" />
            </a>
          </div>

          <img src="/assets/Broquelizate-logos/icono relleno.svg" alt="Icono derecha" className="w-8 h-8 transform -translate-y-2" />
        </div>
      </header>
    </div>
  );
};

export default Header;
