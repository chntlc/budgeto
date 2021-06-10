import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';
import CoinImage from '../images/coin.png';
import NavigationButton from './NavigationButton'
import Home from './Home';
import Login from './Login';

function Navigation(props) {
  const pages = props.pages;

  return (
    <div className="navbar">
      <div className="logo">
        <div className="helper"></div><div className="vertical-center">
          <img src={CoinImage} width="34" height="34" alt="Coin" />
          <p>broke.io</p>
        </div>
      </div>
      <div className="menu-right">
        {pages.map((page, index) => {
          console.log("page in Navigation: ");
          return (<NavigationButton key={page} page={page} />);
        })}
      </div>
    </div>
  );
}

// <NavigationButton pages={pages} />

export default Navigation;
