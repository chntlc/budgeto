import React from 'react';
import Navbar from './Navbar'
import LoginSignup from './LoginSignup'

function App() {
  return (
    <React.Fragment>
      <Navbar button="LOGIN" />
      <LoginSignup />
    </React.Fragment>
  );
}

export default App;
