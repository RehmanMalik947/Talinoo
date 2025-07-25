import React from "react";
import "../../../assets/css/navbar.css";
import { Link } from "react-router-dom";
import { GoBell } from "react-icons/go";
import technologyIcon from "../../../../public/technologyIcon.svg";
function NavBar() {
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        {/* Logo */}
        <div>
          <img src="/talinoo 1.svg" alt="Brand Logo" className="brand-logo" />
        </div>

        {/* Menu + Icons */}
        <div className="flex items-center space-x-6 justify-between">
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
            <Link to="/payments" className="menu-link">
              Payments
            </Link>
            <Link to="/tasks" className="menu-link">
              Tasks
            </Link>

            <Link to="/plans" className="menu-link">
              Plans
            </Link>
          </div>
          <div className="bell-icon-container">
            <GoBell />
          </div>
          <div>
            <img
              src="/technologyIcon.svg"
              alt="Brand Logo"
              className="brand-logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
