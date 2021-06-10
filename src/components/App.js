import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/Login" component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
