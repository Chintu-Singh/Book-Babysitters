import React from 'react';
import './profiles.css';
import '../../colors.css';
import { Typography, Card, CardContent } from '@material-ui/core';

const About = (props) => {
  return (
    <Card elevation={3} className="gradient-border" id="about">
      <CardContent className="card-inside">
        <Typography
          className="card-title"
          gutterBottom
          variant="h6"
          component="h6"
        >
          About {props.profileUser}:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default About;
