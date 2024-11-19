import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader
    try {
      const result = await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
      });
      console.log(result.data);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'An error occurred during registration.');
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="main-body bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <form
          className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 space-y-6"
          onSubmit={handleRegister}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

          {/* Name Input */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-gray-600">Name</label>
            <input
              id="name"
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col space-y-2 relative">
            <label htmlFor="password" className="text-gray-600">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center mt-2">
              <input
                id="show-password"
                type="checkbox"
                className="mr-2"
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label htmlFor="show-password" className="text-gray-600 text-sm">
                Show Password
              </label>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md border transition-all duration-200 ${
              isLoading
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-black text-white hover:bg-white hover:text-black hover:border-black'
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-gray-600">
            Already have an account?
            <NavLink to="/login" className="text-black underline ml-1">
              Log in
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
