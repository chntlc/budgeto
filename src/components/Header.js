import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';

function Header(props) {
  const pages = props.pages;

  return(
    <BrowserRouter>
      <div>
        <Navigation pages={pages}/>
        <Switch>
          {pages.map(page => {
            switch (page) {
              case "Home":
                return (<Route key={page} path="/" component={Home} exact />);
              case "Login":
                return (<Route key={page} path="/Login" component={Login} />);
              default:
                break;
            }
          })}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Header;
