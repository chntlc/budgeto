import React from 'react';
import Navbar from './Navbar'
import Navigation from './Navigation'
import '../css/Home.css';

function Home() {
  return(
    <section>
      <div className="dummy-navbar"></div>
      <div className="home">
        <h1>This is the Landing Page</h1>
        <p>We need more details here!</p>
      </div>
    </section>
  );
}

// <Navbar button="Login"/>

export default Home;
