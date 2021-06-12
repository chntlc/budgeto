import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginSignup from './LoginSignup';


import '../css/Home.css';

function StartSaving() {
  const [showLoginSignup, setLoginSignup] = useState(false)

  return (
    <React.Fragment>
      {showLoginSignup && <LoginSignup />}
      <div className="see-more">
        <button className='start-saving' onClick={() => {
          setLoginSignup(true)
        }}>Start Saving</button>
        {/* <NavLink className="start-saving" to="/login">Start Saving</NavLink> */}
      </div>
    </React.Fragment>
  );
}

export default StartSaving;
