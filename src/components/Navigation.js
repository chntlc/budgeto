import React from 'react';
import '../css/Navbar.css';
import Logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';

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
          let pageLowerCase = page.toLowerCase();
          let to = "/" + pageLowerCase;
          if (page === "Home") {
            return (
              <NavLink className="nav-link" to="/">{page}</NavLink>
            );
          }
          return (<NavLink className="nav-link" to={to}>{page}</NavLink>);
        })}
      </div>
    </div>
  );
}

export default Navigation;
