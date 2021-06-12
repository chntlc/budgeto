import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Login from './Login';

import '../css/Home.css';

function StartSaving() {

  return(
    <div className="see-more">
      <BrowserRouter>
        <NavLink className="start-saving" to="/Login">Start Saving</NavLink>
          <Switch>
            <Route key="Login2" path="/Login" component={Login} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default StartSaving;
