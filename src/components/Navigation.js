import React from "react";
import "../css/Navbar.css";
import Logo from "../images/logo.png";
import { NavLink } from "react-router-dom";
import NavBarProfile from "./NavBarProfile";
import LoginSignup from './LoginSignup';
import { connect, useDispatch } from 'react-redux';
import { toggleLoginModal } from "../features/globalSlice";

function Navigation(props) {
  const dispatch = useDispatch()
  const pages = props.pages;

  const handleLoginSignup = () => {
    dispatch(toggleLoginModal('login'))
  }

  const userImgUrl =
    "https://cdn1.iconfinder.com/data/icons/social-black-buttons/512/anonymous-512.png";

  return (
    <React.Fragment>
      {props.showLoginModal && <LoginSignup />}
      <div className="navbar">
        <div className="logo">
          <div className="helper"></div>
          <div className="vertical-center">
            <img
              className="logo-img"
              src={Logo}
              width="34"
              height="34"
              alt="Coin"
            />
            <h2 className="brand-name">BUDGETO</h2>
          </div>
        </div>
        <div className="menu-right">
          {pages.map((page, index) => {
            let pageLowerCase = page.toLowerCase();
            let to = "/" + pageLowerCase;
            if (page === "Home") {
              return (
                <NavLink key={page} className="nav-link" to="/dashboard">
                  {page}
                </NavLink>
              );
            }
            return props.loggedIn ? (
              <NavBarProfile key="profile" imgUrl={userImgUrl} />
            ) : (
              <button key='login-button' className='login-button' onClick={handleLoginSignup}>Login</button>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    showLoginModal: state.global.showLoginModal
  }
}

export default connect(mapStateToProps)(Navigation);
