import React from 'react';
import NavbarList from './NavbarList'
import '../css/Navbar.css';
import CoinImage from '../images/coin.png';

function Navbar(props) {
  return(
    <div className="navbar">
      <div className="logo">
        <div className="helper"></div><div className="vertical-center">
          <img src={CoinImage} width="34" height="34" alt="Coin" />
          <p>broke.io</p>
        </div>
      </div>
      <ul className="menu-right">
        <NavbarList button={props.button} />
      </ul>
    </div>
  );
}

// <img src="../images/coin.jpg" width="34" height="34" alt="Coin" />

export default Navbar;
