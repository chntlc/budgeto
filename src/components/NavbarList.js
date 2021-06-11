import React from "react";
import "../css/Navbar.css";
import NavBarProfile from "./NavBarProfile";

const userImgUrl =
  "https://cdn1.iconfinder.com/data/icons/social-black-buttons/512/anonymous-512.png";

function NavbarList(props) {
  return (
    <li>
      {props.loggedIn ? (
        <NavBarProfile imgUrl={userImgUrl} />
      ) : (
        <button type="button">Login</button>
      )}
    </li>
  );
}

export default NavbarList;
