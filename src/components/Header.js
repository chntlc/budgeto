import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';

function Header(props) {
  const pages = props.pages;

  console.log("Header pages: " + props.pages);

  function propNavigation() {
    return (<Navigation pages={pages}/>);
  }

  function propRoute() {
    pages.forEach(function(page, index) {
      if (page === "Home") {
        return (<Route path="/" component={page} exact/>);
      }
      let path = "/" + page;
      return (<Route path={path} component={page}/>);
    });
  }

  return(
    <BrowserRouter>
      <div>
        {propNavigation()}
        <Switch>
          {propRoute()}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Header;
