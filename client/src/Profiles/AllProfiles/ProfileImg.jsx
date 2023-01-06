import React, { useEffect, useRef, useState, useContext } from 'react';
import './profiles.css';
import '../../colors.css';
import { Typography, Card, Popover } from '@material-ui/core/';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const ProfileImg = ({ id, role, heartRole, imgURL }) => {
  const { currentUser, user, loading } = useContext(AppContext);
  const heart = useRef(null);
  const [popoverMessage, setPopoverMessage] = useState('');

  useEffect(() => {
    if (!currentUser && !user) {
      heart.current.style.color = 'gray';
    } else {
      axios
        .get('/user/me', { withCredentials: true })
        .then(({ data }) => {
          if (data.favPets.indexOf(id) > -1 && heartRole === 'pet') {
            heart.current.style.color = 'red';
          } else if (data.favUsers.indexOf(id) > -1 && heartRole === 'user') {
            heart.current.style.color = 'red';
          } else {
            heart.current.style.color = 'gray';
          }
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line
  }, [currentUser, user, loading]);

  const toggleFav = () => {
    if (!currentUser || !user) {
      return setPopoverMessage(
        'In order to set favorites, you must be logged in!'
      );
    }
    let profile = 'favPets';
    if (role === 'Baby owner' || role === 'Baby sitter') {
      profile = 'favUsers';
    }
    axios
      .put(`/user/me/favorites?id=${id}&profile=${profile}`, {
        withCredentials: true
      })
      .then(({ data }) => {})
      .catch((error) => console.log(error));
    if (heart.current.style.color === 'red') {
      heart.current.style.color = 'gray';
      setPopoverMessage('Removed from favorites');
    } else {
      heart.current.style.color = 'red';
      setPopoverMessage('Added to favorites');
    }
  };

  // Materials UI Library to handle Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    toggleFav();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popID = open ? 'simple-popover' : undefined;

  return (
    <Card
      elevation={3}
      id="profile-image"
      style={{
        position: 'relative',
        backgroundImage: `url('${imgURL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <FavoriteTwoToneIcon
        aria-describedby={popID}
        ref={heart}
        className="heart"
        onClick={handleClick}
      />
      <Popover
        id={popID}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography
          style={{ padding: '20px', border: '4px double rgb(53, 87, 167)' }}
          component="div"
          variant="button"
          elevation={3}
          className="popover"
        >
          {popoverMessage}
        </Typography>
      </Popover>
    </Card>
  );
};

export default ProfileImg;
