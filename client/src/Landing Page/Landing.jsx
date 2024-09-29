import React from 'react';
import './landing.css';
import '../index.css';
import TitleContainer from './TitleContainer';

const Landing = () => {
  // eslint-disable-next-line
  const height = window.innerHeight;

  return (
    <div id="home-container">
      <div id="top-container">
        <TitleContainer />
      </div>
    </div>
  );
};

export default Landing;
