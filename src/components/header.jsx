// Header.js
import React from "react";
import { Link } from "react-router-dom";
import Logo from "/src/assets/logo.png";
import "./header.css";

const Header = () => {
  return (
    <div className="header-section">
      <div className="logo">
        <img src={Logo} alt="Logo" />
        <h2>Blogit</h2>
      </div>
      <div className="login">
        <Link to="/signin" className="button">
          Sign In
        </Link>
        <Link to="/signup" className="button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Header;
