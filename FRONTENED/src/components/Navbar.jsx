import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import useThemeContext from '../themecontext/UseThemeContext';
import { FaSearch } from 'react-icons/fa';

function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isToggled, toggle } = useThemeContext();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDetails = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/users/getMyProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserRole(data.role);
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      userDetails();
    }
  }, []);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleRole = () => {
    if (userRole === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/restricted-access');
      toast.error("You don't have permissions to access the dashboard");
    }
  };

  const toggleMobileMenu = () => {
    setMobile(!mobile);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true });
      toast.success('Logout successful');
  
      // Clear local storage and any other login state
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUserRole('');
  
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out. Please try again.');
    }
  };
  

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <img src="logo.png" alt="logo" className="w-8" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:space-x-6 relative" ref={dropdownRef}>
          <Link to="/home" className="text-gray-900 dark:text-white hover:text-blue-700">Home</Link>
          <Link to="/blogs" className="text-gray-900 dark:text-white hover:text-blue-700">Blogs</Link>
          <Link to="/creators" className="text-gray-900 dark:text-white hover:text-blue-700">Creators</Link>
          <Link to="/contact" className="text-gray-900 dark:text-white hover:text-blue-700">Contact</Link>

          {userRole === 'admin' && (
            <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRole}>
              Dashboard
            </Link>
          )}

          {isLoggedIn ? (
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <button className="bg-gradient-to-r from-blue-800 to-blue-900 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/login')}>
              Login
            </button>
          )}

          {/* Dropdown Menu */}
          <div className="relative">
            <button 
              className="bg-gradient-to-r from-blue-800 to-blue-900 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              Menu <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
            </button>
            {isOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                <li>
                <Link to="/search" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 flex items-center">
                    Search <FaSearch className="ml-1" />
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={toggle} 
                    className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300 
                      ${isToggled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                  >
                   Toggle <FontAwesomeIcon icon={isToggled ? faSun : faMoon} />
                  </button>
                </li>
                {/* <li>
                  <Link to="/search/option3" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Option 3</Link>
                </li> */}
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} aria-label={mobile ? 'Close menu' : 'Open menu'}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobile ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {mobile && (
            <div className="absolute top-16 left-0 right-0 z-10 bg-white dark:bg-gray-900 shadow-md py-2 px-4">
              <ul className="space-y-2">
                <li>
                  <Link to="/home" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Home</Link>
                </li>
                <li>
                  <Link to="/blogs" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Blogs</Link>
                </li>
                <li>
                  <Link to="/creators" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Creators</Link>
                </li>
                <li>
                  <Link to="/contact" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Contact</Link>
                </li>
                <li>
                  <Link to="/about" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">About Me</Link>
                </li>
                {userRole === 'admin' && (
                  <li>
                    <Link to="/dashboard" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRole}>
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  {isLoggedIn ? (
                    <button className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={logoutHandler}>
                      Logout
                    </button>
                  ) : (
                    <button className="block py-2 px-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => navigate('/login')}>
                      Login
                    </button>
                  )}
                </li>
                {/* Mobile Dropdown */}
                <li className="relative">
                  <button 
                    className="bg-gradient-to-r from-blue-800 to-blue-900 hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-800 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Menu <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                  </button>
                  {isOpen && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                      <li>
                      <Link to="/search" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 flex items-center">
                         Search <FaSearch className="ml-1" />
                      </Link>
                      </li>
                      <li>
                        <button 
                          onClick={toggle} 
                          className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300 
                            ${isToggled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                        >
                          Toggle<FontAwesomeIcon icon={isToggled ? faSun : faMoon} />
                        </button>
                      </li>
                      {/* <li>
                        <Link to="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Option 3</Link>
                      </li> */}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
