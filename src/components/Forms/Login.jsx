import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handelLogin = async(e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/login-user',{ email,password });
      // console.log(result.data.data);
      window.localStorage.setItem('Token',result.data.data);
      alert('Login successful');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form className="space-y-6" onSubmit={(e) => handelLogin(e)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="show-password" className="text-sm text-gray-700">
              Show Password
            </label>
          </div>
        </div>

        <div className='flex flex-col items-center gap-3'>
          <button
            type="submit"
            className="w-full px-4 py-2 border border-black text-black bg-white hover:bg-black hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
          <p className='text-slate-600'>Not registered? <NavLink to={'/register'} className={"underline text-black"}>Create free account</NavLink></p>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login
