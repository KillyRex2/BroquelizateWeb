import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '' 
  });
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', loginData, {
        withCredentials: true
      });
      if (response.status === 200) {
        // Aquí almacenas el nombre de usuario en localStorage
        localStorage.setItem('username', loginData.username);
        alert('Login successful');
        // Redirigir a la página principal
        window.location.href = '/';
      }
    } catch (error) {
      alert('Error during login. Please try again.');
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  
    console.log('Register data:', registerData); // Log de los datos del formulario
  
    try {
      const response = await axios.post('http://localhost:3000/register', registerData, {
        withCredentials: true
      });
  
      console.log('Response from server:', response); // Log de la respuesta del servidor
  
      if (response.status === 200) {
        alert('Registration successful');
      } else {
        alert(`Registration failed: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <section id="login" className="py-8">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8">
        
        {/* Login Form */}
        <div className="w-full max-w-md mx-auto rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-2xl font-medium text-slate-700">Login</h2>
            <p className="text-slate-500">Enter details below.</p>
          </div>
          <form className="w-full mt-4 space-y-3" onSubmit={handleLogin}>
            <div>
              <input
                className="outline-none border-2 rounded-md px-3 py-2 bg-gray-200 text-slate-500 w-full focus:border-blue-300"
                placeholder="Username"
                id="username"
                name="username"
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
              />
            </div>
            <div>
              <input
                className="outline-none border-2 rounded-md px-3 py-2 bg-gray-200 text-slate-500 w-full focus:border-blue-300"
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="mr-2 w-4 h-4"
                  id="remember"
                  name="remember"
                  type="checkbox"
                />
                <span className="text-slate-500">Remember me</span>
              </div>
              <a className="text-yellow-600 font-medium hover:underline" href="#">
                Forgot Password
              </a>
            </div>
            <button
              className="w-full justify-center py-2 bg-black hover:bg-yellow-600 active:bg-blue-700 rounded-md text-white ring-2"
              id="login"
              name="login"
              type="submit"
            >
              Login
            </button>
            <p className="flex justify-center space-x-1">
              <span className="text-slate-700">Have an account?</span>
              <a className="text-yellow-600 hover:underline" href="#">
                Sign Up
              </a>
            </p>
          </form>
        </div>

        <h2>Or</h2>

        {/* Register Form */}
        <div className="w-full max-w-md mx-auto rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-2xl font-medium text-slate-700">Create an account</h2>
          </div>
          <form className="w-full mt-4 grid gap-4" onSubmit={handleRegister}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                Your username
              </label>
              <input
                id="username"
                placeholder="Username"
                className={`bg-gray-50 border ${registerData.username === "" ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
                type="text"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
              />
              {registerData.username === "" && (
                <span className="text-red-500 text-sm">Username is required</span>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                id="email"
                className={`bg-gray-50 border ${registerData.email === "" ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
                placeholder="you@example.com"
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
              {registerData.email === "" && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                className={`bg-gray-50 border ${registerData.password === "" ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
                placeholder="••••••••"
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
              {registerData.password === "" && (
                <span className="text-red-500 text-sm">Password is required</span>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                className={`bg-gray-50 border ${registerData.confirmPassword === "" ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
                placeholder="••••••••"
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({ ...registerData, confirmPassword: e.target.value })
                }
              />
              {registerData.password !== registerData.confirmPassword && (
                <span className="text-red-500 text-sm">Passwords do not match</span>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I accept the{" "}
                  <a
                    href="#"
                    className="font-medium text-yellow-600 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              className="w-full bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
