import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const TitleContainer = () => {
  const history = useHistory();
  return (
    <div id="landing-title-container">
      <Typography className="lt-title" gutterBottom variant="h1" component="h1">
        Hire Babysitters
      </Typography>
      <Typography
        className="lt-subtitle"
        gutterBottom
        variant="h4"
        component="h4"
      >
        Platform for connecting women with maids and babysitters
      </Typography>
      <br />

      <Button
        className="home-btn"
        variant="contained"
        style={{ margin: '0 auto' }}
        onClick={() => {
          history.push('/login');
        }}
      >
        <strong>Login</strong>
      </Button>
    </div>
  );
};

export default TitleContainer;
