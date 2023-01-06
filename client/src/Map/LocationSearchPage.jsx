import React, { useContext } from 'react';
import '../colors.css';
import './map.css';
import { Typography, Card, CardContent } from '@material-ui/core';
import { AppContext } from '../context/AppContext';
import Map from './Map';

const LocationSearchPage = () => {
  const { currentUser } = useContext(AppContext);

  return (
    <div id="map-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside">
          <Typography variant="h2">Location Search</Typography>
          <Typography
            variant="body1"
            style={{ margin: '20px', maxWidth: '450px' }}
          >
            Search by location! The map displays all the
            <b className="map-bold">
              {' '}
              maids and baby
              {currentUser?.owner ? ' sitters' : ' owners'}
            </b>{' '}
            near you. Click on a marker to view that user's information and a
            link to their profile.
          </Typography>
        </CardContent>
      </Card>

      <Card
        style={{ marginTop: '30px', marginBottom: '50px' }}
        elevation={3}
        className="gradient-border"
      >
        <CardContent className="card-inside" id="map-card">
          <Map />
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationSearchPage;
