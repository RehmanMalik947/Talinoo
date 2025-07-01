import React from 'react';
import '../../../assets/css/navbar.css';
import { FaBell, FaEthereum } from 'react-icons/fa';



function NavBar() {
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        
        {/* Logo */}
        <div>
          <img src="/talinoo 1.svg" alt="Brand Logo" className="brand-logo" />
        </div>

        {/* Menu + Icons */}
        <div className="flex items-center space-x-6">
          <div className="menu-links">
            <a href="#">Dashboard</a>
            <a href="#">Clients</a>
            <a href="#">Talents</a>
            <a href="#">Tasks</a>
            <a href="#">Payments</a>
            <a href="#">Plans</a>
          </div>

          <div className="bell-icon-container">
            <FaBell />
          </div>

          <div className="circle-icon-container">
            <FaEthereum />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;