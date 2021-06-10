import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';
import CoinImage from '../images/coin.png';
import NavigationButton from './NavigationButton'
import Home from './Home';
import Login from './Login';

function Navigation() {
  return (
    <div className="navbar">
      <div className="logo">
        <div className="helper"></div><div className="vertical-center">
          <img src={CoinImage} width="34" height="34" alt="Coin" />
          <p>broke.io</p>
        </div>
      </div>
      <div className="menu-right">
        <NavigationButton button="Home" />
        <NavigationButton button="Login" />
      </div>
    </div>
  );
}

export default Navigation;
