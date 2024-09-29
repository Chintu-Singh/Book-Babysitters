import React, { useState, useEffect } from 'react';
import defaultPet from '../../Images/defaultPet.png';
import '../AllProfiles/profiles.css';
import '../../colors.css';
import {
  CardMedia,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const BabyCard = ({ petID }) => {
  const history = useHistory();
  const [petCard, setPetCard] = useState({});

  useEffect(() => {
    fetch(`/pets/${petID}`)
      .then((res) => res.json())
      .then((petCard) => {
        setPetCard(petCard);
      })
      .catch((err) => console.log(err));
  }, [petID]);

  return (
    <Card elevation={3} className="pet-card gradient-border">
      <CardMedia
        className="pet-card-img"
        component="img"
        alt="pet-img"
        image={petCard.avatar || defaultPet}
        title="pet-img"
      />
      <CardContent className="card-inside">
        <Typography className="pet-card-title" variant="h5">
          {petCard.name}
        </Typography>
      </CardContent>
      <CardActions className="pet-card-btns card-inside">
        <Button
          onClick={() => history.push(`/petprofile/${petID}`)}
          className="card-btn"
          variant="contained"
          style={{ backgroundColor: 'black' }}
        >
          View {petCard.type}
        </Button>
      </CardActions>
    </Card>
  );
};

export default BabyCard;
