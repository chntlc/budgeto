import React, { Component } from 'react';
import Header from './Header';


class App extends Component {
  render() {
    return (
      <Header pages={["Home", "Login"]} />
    );
  }
}

export default App;
