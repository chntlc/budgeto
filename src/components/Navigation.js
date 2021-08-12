import React, { useContext } from "react";
import "../css/Navbar.css";
import Logo from "../images/logo.png";
import ProfilePic from "../images/defaultProfile.jpg";
import { NavLink } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import Settings from "./Settings";
import { UserContext } from "./context/UserContext";
import { connect, useDispatch } from "react-redux";
import { toggleLoginModal } from "../features/globalSlice";
import { toggleSettingsModal } from "../features/globalSlice";

function Navigation(props) {
  const dispatch = useDispatch();
  const { pages, profileImg } = props;
  const [userContext, setUserContext] = useContext(UserContext);

  const handleLoginSignup = () => {
    dispatch(toggleLoginModal("login"));
  };

  const handleSettings = () => {
    dispatch(toggleSettingsModal("settings"));
  };

  const userImg = profileImg === "" ? ProfilePic : profileImg;

  return (
    <React.Fragment>
      {props.showLoginModal && <LoginSignup />}
      {props.showSettingsModal && <Settings />}
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
            return userContext.token ? (
              <img
                key="settings-button"
                src={userImg}
                className="navbar__profile"
                onClick={handleSettings}
                alt="user-img"
              />
            ) : (
              <button
                key="login-button"
                className="login-button"
                onClick={handleLoginSignup}
              >
                Login
              </button>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    showLoginModal: state.global.showLoginModal,
    showSettingsModal: state.global.showSettingsModal,
    isLoggedIn: state.global.isLoggedIn,
    profileImg: state.global.user.profileImg,
  };
};

export default connect(mapStateToProps)(Navigation);
