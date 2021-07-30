import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "../css/LoginSignup.css";
import { Link, NavLink } from "react-router-dom";
import {
  toggleLoginModal,
  userLogin,
  userSignup,
} from "../features/globalSlice";
import { connect, useDispatch } from "react-redux";

function LoginSignup(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    _id: "",
    email: "",
    fname: "",
    lname: "",
    budget: 0,
    profileImg: "",
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPassword2, setSignupPassword2] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    fetch("/users").then((res) => {
      console.log("This is the useEffect method.");
      console.log("This is the response: ", res);
      setErrors(res);
    });
  }, []);

  async function handleLogin() {
    const loginUser = {
      email: loginEmail,
      password: loginPassword,
    };

    console.log("This is handleLogin method.");
    console.log("This is what you have requested: ", loginUser);

    await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Found User: ", res);

        setUser(res);
        dispatch(userLogin(res));
        dispatch(toggleLoginModal(""));
      })
      .catch((err) => {
        console.log(err);
        alert("Wrong User credential! Please try again.");
        // window.location.replace("http://localhost:3000/");
      });
  }

  async function handleSignup() {
    if (signupPassword !== signupPassword2) {
      // window.location.replace("http://localhost:3000/");
    }
    const newUser = {
      fname: signupFirstName,
      lname: signupLastName,
      budget: 0,
      email: signupEmail,
      password: signupPassword,
      profileImg: "",
    };

    console.log("This is handleSignup method.");
    console.log("This is what you have requested: ", newUser);

    await fetch("/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        console.log("Current User: ", user);
        dispatch(userSignup(res));
        dispatch(toggleLoginModal(""));
        // props.history.push("/dashboard");
        // window.location.href = "http://localhost:3000/dashboard";
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to signup! Please try again.");
        // window.location.replace("http://localhost:3000/");
        // window.location.href = "http://localhost:3000/";
        // props.history.push("/");
      });
  }

  const redirectLogin = () => {
    dispatch(toggleLoginModal("login"));
  };

  const redirectSignup = () => {
    dispatch(toggleLoginModal("signup"));
  };

  const closeLoginModal = () => {
    dispatch(toggleLoginModal(""));
  };

  const loginForm = (
    <form className="login-form">
      <label>Email</label>
      <input
        className="login-email-input"
        value={loginEmail}
        onChange={(e) => {
          setLoginEmail(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        className="login-password-input last-form-input"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      {/* <NavLink to={props.isLoggedIn ? '/dashboard' : '/'} className='login-submit-link'> */}
      {/* <NavLink to='/' className='login-submit-link'> */}
      {/* <NavLink to='/dashboard' className='login-submit-link'> */}
      <NavLink to="/dashboard" className="login-submit-link">
        <button
          type="button"
          className="login-submit-button"
          onClick={handleLogin}
        >
          GO!
        </button>
      </NavLink>
      {/* <button type='button' className='login-submit-button' onClick={handleLogin}>GO!</button> */}
    </form>
  );

  const signupForm = (
    <form className="signup-form">
      <label>First Name</label>
      <input
        className="signup-first-name-input"
        value={signupFirstName}
        onChange={(e) => setSignupFirstName(e.target.value)}
      />
      <label>Last Name</label>
      <input
        className="signup-last-name-input"
        value={signupLastName}
        onChange={(e) => setSignupLastName(e.target.value)}
      />
      <label>Email</label>
      <input
        className="signup-email-input"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        className="signup-password-input"
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
      />
      <label>Confirm Password</label>
      <input
        type="password"
        className="signup-password-confirm-input"
        value={signupPassword2}
        onChange={(e) => setSignupPassword2(e.target.value)}
      />
      <div className="login-submit-button-wrapper">
        <NavLink to="/dashboard" className="login-submit-link">
          <button className="login-submit-button" onClick={handleSignup}>
            SIGN ME UP!
          </button>
        </NavLink>
      </div>
    </form>
  );

  return (
    <Modal
      header={
        <React.Fragment>
          <button
            id="login-header"
            className={props.showLogin === "login" ? "underline-label" : ""}
            onClick={redirectLogin}
          >
            LOGIN
          </button>
          <span>&nbsp;/&nbsp;</span>
          <button
            id="signup-header"
            className={props.showLogin === "signup" ? "underline-label" : ""}
            onClick={redirectSignup}
          >
            SIGNUP
          </button>
        </React.Fragment>
      }
      content={props.showLogin === "login" ? loginForm : signupForm}
      onClose={closeLoginModal}
    ></Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    showLogin: state.global.showLoginModal,
    user: state.global.user,
    isLoggedIn: state.global.isLoggedIn,
  };
};

export default connect(mapStateToProps)(LoginSignup);
