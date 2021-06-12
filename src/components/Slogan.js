import React, { useState, useEffect } from 'react';
import TextTransition, { presets } from "react-text-transition";

import '../css/Home.css';

function Slogan() {
  const TEXTS = [
    "See More",
    "Spend Less"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      2000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return(
    <div className="welcome-text">
      <h1>
        <TextTransition
          text={ TEXTS[index % TEXTS.length] }
          springConfig={ presets.wobbly }
          />
      </h1>
    </div>
  );
}

export default Slogan;
