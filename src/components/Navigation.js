import React from 'react';
import '../css/Navbar.css';
import CoinImage from '../images/coin.png';
import NavigationButton from './NavigationButton'

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
          return (<NavigationButton key={page} page={page} />);
        })}
      </div>
    </div>
  );
}

// <NavigationButton pages={pages} />

export default Navigation;
