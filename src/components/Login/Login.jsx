import React from 'react';

const LoginForm = () => {

  
  return (
    <section id="login" className="py-8">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8">
        {/* Login Form */}
        <div className="w-full max-w-md mx-auto rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-2xl font-medium text-slate-700">Login</h2>
            <p className="text-slate-500">Enter details below.</p>
          </div>
          <form className="w-full mt-4 space-y-3">
            <div>
              <input
                className="outline-none border-2 rounded-md px-3 py-2 bg-gray-200 text-slate-500 w-full focus:border-blue-300"
                placeholder="Username"
                id="username"
                name="username"
                type="text"
              />
            </div>
            <div>
              <input
                className="outline-none border-2 rounded-md px-3 py-2 bg-gray-200 text-slate-500 w-full focus:border-blue-300"
                placeholder="Password"
                id="password"
                name="password"
                type="password"
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
          <form className="w-full mt-4 space-y-3">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your username
              </label>
              <input
                placeholder="Username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                id="username"
                type="text"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                id="password"
                type="password"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                id="confirmPassword"
                type="password"
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  type="checkbox"
                  id="terms"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-light text-gray-500">
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
              Create an account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
