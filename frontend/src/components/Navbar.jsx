import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md transition duration-200 text-sm md:text-base ${
      isActive
        ? 'bg-white text-black font-semibold shadow-sm'
        : 'text-white hover:bg-white hover:text-black'
    }`;

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <ul className="flex flex-wrap gap-3 md:gap-6">
          <li>
            <NavLink to="/" className={navLinkClass}>
              📊 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={navLinkClass}>
              📦 Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/suppliers" className={navLinkClass}>
              🚚 Suppliers
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions" className={navLinkClass}>
              💸 Transactions
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
