import React from "react";
import Logo from "../logo/logo";
import NavBar from "../Nav-Bar/NavBar";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <Logo className="logo" />
      <NavBar className="nav-bar" />
    </div>
  );
};

export default Header;
