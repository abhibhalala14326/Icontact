import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-6 justify-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-600"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-600"
                }`
              }
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-600"
                }`
              }
            >
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-white px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-600"
                }`
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* Renders child components */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
