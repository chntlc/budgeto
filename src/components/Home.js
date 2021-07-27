import React, { useContext, useState } from 'react';
import Slogan from './Slogan';
import StartSaving from './StartSaving';
import { UserContext } from "./context/UserContext"

import '../css/Home.css';

function Home() {
  const [userContext, setUserContext] = useContext(UserContext);

  return (
    <section className="home-section">
      <div className="helper"></div><div className="vertical-center">
        <Slogan />
        <StartSaving />
      </div>
    </section>
  )
}

export default Home;
