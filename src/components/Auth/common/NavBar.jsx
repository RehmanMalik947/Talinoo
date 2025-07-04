import React from 'react';
import '../../../assets/css/navbar.css';
import { FaBell, FaEthereum } from 'react-icons/fa';
import {Link} from 'react-router-dom';


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
            <Link to="/dashboard" className="menu-link">
              Dashboard
            </Link>
            <Link to="/clients" className="menu-link">
              Clients
            </Link>
            <Link to="/talents" className="menu-link">
              Talents
            </Link>
            {/* <Link to="/tasks" className="menu-link">
              Tasks
            </Link>
            <link to="/payments" className='menu-link'>
              Payments
            </link>
            <Link to="/plans" className="menu-link">
              Plans
            </Link> */}
            
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