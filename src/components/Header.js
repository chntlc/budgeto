import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';

function Header(props) {
  // How to go back to previous page: https://stackoverflow.com/questions/30915173/react-router-go-back-a-page-how-do-you-configure-history
  // Another doc: https://stackoverflow.com/questions/46681387/react-router-v4-how-to-go-back

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
