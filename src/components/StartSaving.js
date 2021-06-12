import React from 'react';
import { NavLink } from 'react-router-dom';


import '../css/Home.css';

function StartSaving() {

  return (
    <div className="see-more">
      <NavLink className="start-saving" to="/login">Start Saving</NavLink>
    </div>
  );
}

export default StartSaving;
