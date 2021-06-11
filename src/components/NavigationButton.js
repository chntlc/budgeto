import React from 'react';
import '../css/Navbar.css';
import { NavLink } from 'react-router-dom';

function NavigationButton(props) {
  let page = props.page;
  let to = "/" + page;

  if (page === "Home") {
    return (
      <NavLink className="nav-link" to="/">{page}</NavLink>
    );
  }

  return(
    <NavLink className="nav-link" to={to}>{page}</NavLink>
  );
}

export default NavigationButton;
