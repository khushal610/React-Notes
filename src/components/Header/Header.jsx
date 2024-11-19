import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem('Token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setName(decodedToken.name);
        setIsLogin(true);
      } catch (error) {
        console.error('Invalid token:', error);
        window.localStorage.removeItem('Token');
        navigate('/login');
      }
    }
  }, [navigate]);

  const logoutUser = () => {
    window.localStorage.removeItem('Token');
    setIsLogin(false);
    setName(null); 
    navigate('/login');
  };

  return (
    <>
      <header className="flex h-20 bg-slate-300 items-center justify-around fixed w-full">
        <div className="logo flex items-center justify-center lg:w-4/12">
          <h1 className="text-4xl">NOTES</h1>
        </div>
        <div className="navigation lg:w-8/12 flex items-center justify-evenly gap-10">
          <nav>
            <ul className="flex gap-5">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/notes">Notes</NavLink></li>
              {isLogin && <li><NavLink to="/">{name}</NavLink></li>}
            </ul>
          </nav>
          {isLogin ? (
            <div className="flex gap-4">
              <button
                className="border border-black py-2 px-4 rounded-md"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <NavLink to="/login">
                <button className="border border-black py-2 px-4 rounded-md">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="border border-black py-2 px-4 rounded-md">
                  Register
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
