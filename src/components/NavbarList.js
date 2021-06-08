import React from 'react';
import '../css/Navbar.css';

function NavbarList(props) {
  return(
    <li>
      <button type="button">
        {props.button}
      </button>
    </li>
  );
}

export default NavbarList;
