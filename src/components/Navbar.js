import React from 'react';
import NavbarList from './NavbarList'
import '../css/Navbar.css';

function Navbar() {
  return(
    <div className="navbar">

      <ul className="menu-right">
        <NavbarList button="Home" />
        <NavbarList button="Login" />
      </ul>
    </div>
  );
}

// <img src="../images/coin.jpg" width="34" height="34" alt="Coin" />

export default Navbar;
