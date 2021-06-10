import React from 'react';
import '../css/Navbar.css';
import { NavLink } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

function NavigationButton(props) {
  let button = props.button;
  let to = "/" + button;

  if (button === "Home") {
    return (
      <NavLink className="nav-link" to="/">{button}</NavLink>
    );
  }

  return(
    <NavLink className="nav-link" to={to}>{button}</NavLink>
  );
}

export default NavigationButton;
