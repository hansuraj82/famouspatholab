



import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuthCheck from "./Hooks/useAuthCheck";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuthCheck();
  const navItems = ["Home", "Login", "Report", "About", "History"];
  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem("auth");
    
    window.dispatchEvent(new Event("auth-change"));
    setIsLoggedIn(false);
    navigate("/login");

  };




  return (
    <nav className="backdrop-blur-md bg-white/80 text-blue-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* ✅ Logo + Title */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966485.png"
            alt="Lab Logo"
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold tracking-wide">
            Famous Patho Lab
          </span>
        </NavLink>

        {/* ✅ Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          {navItems.map((page) => (
            <NavLink
              key={page}
              to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
              className={({ isActive }) =>
                `relative after:content-[''] after:block after:h-[2px] after:bg-blue-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left 
                hover:text-blue-600 ${isActive ? "text-blue-600 after:scale-x-100" : "text-gray-700"
                }`
              }

            >
              {page}
            </NavLink>

          ))}
          {isLoggedIn && (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>

          )}

        </div>

        {/* ✅ Mobile Toggle */}
        <button
          className="md:hidden text-blue-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/90 px-6 py-4 space-y-3 shadow animate-fadeInDown">
          {navItems.map((page) => (
            <NavLink
              key={page}
              to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-lg font-medium ${isActive ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-500`
              }
            >
              {page}
            </NavLink>
          ))}
          {isLoggedIn && (
            <button onClick={handleLogout} className="redBtn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>

          )}
        </div>
      )}
    </nav>
  );
}
