import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { FaNewspaper, FaTableList } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  let userName = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userName = payload.name;
    } catch {
      console.error("Invalid token");
    }
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div >
             
         
          <Link to="/" className="text-2xl mb-0 ">
         <img src="src/assets/logo.png" alt="" className="w-24 h-24 rounded "/>
          </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">

            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded hover:bg-blue-500 transition ${
                  isActive ? "bg-white text-black" : "text-white"
                }`
              }
            >
              <FaHome className="text-2xl" />Home
            </NavLink>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                `px-4 py-2 rounded hover:bg-blue-500 transition ${
                  isActive ? "bg-white text-black" : "text-white"
                }`
              }
            >
              <FaTableList className="text-2xl" />Categories
            </NavLink>

            {/* Login */}
            {!userName && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-blue-500 transition ${
                    isActive ? "bg-white text-black" : "text-white"
                  }`
                }
              >
                <FaUser className="text-2xl" />Account
              </NavLink>
            )}

            {/* Dashboard */}
            {userName && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-4 py-2 rounded hover:bg-blue-500 transition ${
                    isActive ? "bg-white text-black" : "text-white"
                  }`
                }
              >
                <FaUser className="text-2xl" />Dashboard
              </NavLink>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-2 pt-2 pb-4 space-y-1">

          <NavLink
            to="/"
            className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-blue-400 ${
                    isActive ? "bg-white text-black" : "text-white"
                  }`
                }
            // onClick={() => setIsOpen(false)}
          >
            <FaHome className="text-2xl" />
          </NavLink>
          
           <NavLink
              to="/category"
              className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-blue-400 ${
                    isActive ? "bg-white text-black" : "text-white"
                  }`
                }
            >
              <FaTableList className="text-xl" />
            </NavLink>
          
            <NavLink
              to="/login"
              className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-blue-400 ${
                    isActive ? "bg-white text-black" : "text-white "
                  }`
                }
              // onClick={() => setIsOpen(false)}
            >
              <FaUser className="text-xl" />
            </NavLink>
         
        </div>
      )}

    </nav>
  );
}
