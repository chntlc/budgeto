import React, { useContext, useState } from "react";
import Modal from "./Modal";
import "../css/LoginSignup.css";
import { NavLink } from "react-router-dom";
import {
  toggleLoginModal,
  userLogin,
  userSignup,
} from "../features/globalSlice";
import { connect, useDispatch } from "react-redux";
import { UserContext } from "./context/UserContext";

function LoginSignup(props) {
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupBudget, setSignupBudget] = useState(0);
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPassword2, setSignupPassword2] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [error, setError] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  async function handleLogin(event) {
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    const loginUser = {
      username: loginEmail,
      password: loginPassword,
    };

    await fetch("/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    })
      .then((res) => res.json())
      .then((res) => {
        setUserContext((oldValues) => {
          return { ...oldValues, token: res.token };
        });
        dispatch(userLogin(res.loggedInUser));
        dispatch(toggleLoginModal(""));
      })
      .catch((err) => {
        setError(genericErrorMessage);
        console.log(err);
        alert("Wrong User credential! Please try again.");
        if (process.env.NODE_ENV !== "production") {
          window.location.replace("http://localhost:3000/");
        } else {
          window.location.replace("http://budgeto-app.herokuapp.com/");
        }
      });
  }

  async function handleSignup(event) {
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    if (signupPassword !== signupPassword2) {
      alert("Password not matching! Please try again.");
      if (process.env.NODE_ENV !== "production") {
        window.location.replace("http://localhost:3000/");
      } else {
        window.location.replace("http://budgeto-app.herokuapp.com/");
      }
      return;
    }
    const newUser = {
      fname: signupFirstName,
      lname: signupLastName,
      budget: signupBudget,
      username: signupEmail,
      password: signupPassword,
      profileImg: "",
      category_ids: [
        "60f290e8ce75a0e1c42e404c",
        "60f2afba040b34ebc74be130",
        "60f2b0fed9e4daec224be7aa",
        "60f2cbd65e51f2f481a0698f",
        "60f2cd9bc034faf55bde2154",
      ],
    };

    await fetch("/users/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((res) => {
        setUserContext((oldValues) => {
          return { ...oldValues, token: res.token };
        });
        dispatch(userSignup(res.signedUser));
        dispatch(toggleLoginModal(""));
      })
      .catch((err) => {
        setError(genericErrorMessage);
        console.log(err);
        alert("Failed to signup! Please try again.");
        if (process.env.NODE_ENV !== "production") {
          window.location.replace("http://localhost:3000/");
        } else {
          window.location.replace("http://budgeto-app.herokuapp.com/");
        }
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
      <NavLink to="/dashboard" className="login-submit-link">
        <button
          type="button"
          className="login-submit-button"
          onClick={handleLogin}
        >
          GO!
        </button>
      </NavLink>
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
      <label>Budget</label>
      <input
        className="signup-budget-input"
        value={signupBudget}
        onChange={(e) => setSignupBudget(e.target.value)}
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
