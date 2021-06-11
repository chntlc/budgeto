import React from 'react';
import Header from './Header';
import '../css/Login.css';

function Login() {
  return(
    <section className="login-section">
      <Header pages={["Home"]} />
      <div className="helper"></div><div className="vertical-center">
        <h1>This is the Login Page</h1>
        <p>Implement Login Page Here!</p>
      </div>
    </section>
  );
}

// <Header pages={["Home"]} />

export default Login;
