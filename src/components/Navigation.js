import React from 'react';
import '../css/Navbar.css';
import CoinImage from '../images/coin.png';
import Logo from '../images/logo.png';
import NavigationButton from './NavigationButton'

function Navigation(props) {
  const pages = props.pages;

  return (
    <div className="navbar">
      <div className="logo">
        <div className="helper"></div><div className="vertical-center">
          <img className="logo-img" src={Logo} width="34" height="34" alt="Coin" />
          <h2>BUDGETO</h2>
        </div>
      </div>
      <div className="menu-right">
        {pages.map((page, index) => {
          return (<NavigationButton key={page} page={page} />);
        })}
      </div>
    </div>
  );
}

// <NavigationButton pages={pages} />

export default Navigation;
