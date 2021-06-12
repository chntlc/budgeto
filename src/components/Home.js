import React from 'react';
import Slogan from './Slogan';
import StartSaving from './StartSaving';

import '../css/Home.css';

function Home() {

  return(
    <section className="home-section">
      <div className="helper"></div><div className="vertical-center">
        <Slogan />
        <StartSaving />
      </div>
    </section>
  );
}

export default Home;
