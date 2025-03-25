import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="logo">AAI Fin</div>

        {/* Hamburger Icon */}
        <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "nav-active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Dashboard</Link>
          </li>
          <li>
            <Link to="/payments" onClick={() => setIsOpen(false)}>&#163; Payment</Link>
          </li>
          <li>
            <Link to="/transactions" onClick={() => setIsOpen(false)}>&#8644; Transactions</Link>
          </li>
          <li>
            <Link to="/mortgage" onClick={() => setIsOpen(false)}>&#x1F3E0; Mortgage</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
