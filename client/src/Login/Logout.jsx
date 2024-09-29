import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { AppContext } from '../context/AppContext';

const Logout = ({ styleType }) => {
  const history = useHistory();
  const { setCurrentUser, setCurrentPets } = useContext(AppContext);

  const handleLogOut = () => {
    axios
      .post('/user/logout', { withCredentials: true })
      .then(() => {
        setCurrentUser(null);
        setCurrentPets(null);
        sessionStorage.removeItem('user');
        history.push('/login');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Button style={styleType} onClick={handleLogOut}>
      Logout
    </Button>
  );
};

export default Logout;
