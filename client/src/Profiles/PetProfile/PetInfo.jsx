import React from 'react';
import '../AllProfiles/profiles.css';
import '../../colors.css';
import { Typography, Card, CardContent } from '@material-ui/core';

const PetInfo = ({ title, instructions, links }) => {
  // Hide Empty Info Cards
  if (instructions || links) {
    return (
      <Card elevation={3} className="gradient-border" id="pet-info">
        <CardContent className="card-inside">
          <Typography
            className="card-title"
            gutterBottom
            variant="h6"
            component="h6"
          >
            {title}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            {links &&
              links.map((el) => {
                return (
                  <div key={el._id}>
                    <a href={el.url}>&#10686; {el.text}</a>
                  </div>
                );
              })}
            {instructions && instructions}
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    return null;
  }
};
export default PetInfo;
