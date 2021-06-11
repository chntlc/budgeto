import React, { useState, useEffect } from 'react';
import TextTransition, { presets } from "react-text-transition";

import '../css/Home.css';

function Home() {
  const TEXTS = [
    "See More",
    "Spend Less",
    "Start Saving"
  ];

  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      2000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return(
    <section className="home-section">
      <div className="helper"></div><div className="vertical-center">
        <div className="welcome-text">
          <h1>
            <TextTransition
              text={ TEXTS[index % TEXTS.length] }
              springConfig={ presets.wobbly }
            />
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Home;
