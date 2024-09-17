import React from 'react';

const LoginForm = () => {
  return (
    <section id="login" className="">
        <div className="flex items-center justify-center min-h-screen">
      <div className="w-80 rounded-lg shadow h-auto p-4 bg-white relative overflow-hidden"> {/* Reduced padding */}
        <div className="flex flex-col justify-center items-center space-y-1"> {/* Reduced vertical space */}
          <h2 className="text-2xl font-medium text-slate-700">Login</h2>
          <p className="text-slate-500">Enter details below.</p>
        </div>
        <form className="w-full mt-3 space-y-2"> {/* Reduced margin and spacing */}
          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 bg-gray-200 text-slate-500 w-full focus:border-blue-300"
              placeholder="Username"
              id="username"
              name="username"
              type="text"
            />
          </div>
          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 bg-gray-200 text-slate-500 w-full focus:border-blue-300"
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
            <a className="text-yellow-600 font-medium hover:underline" href="#">Forgot Password</a>
          </div>
          <button
            className="w-full justify-center py-1 bg-black hover:bg-yellow-600 active:bg-blue-700 rounded-md text-white ring-2"
            id="login"
            name="login"
            type="submit"
          >
            login
          </button>
          <p className="flex justify-center space-x-1">
            <span className="text-slate-700">Have an account?</span>
            <a className="text-yellow-600 hover:underline" href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
    </section>
  
  );
};

export default LoginForm;
