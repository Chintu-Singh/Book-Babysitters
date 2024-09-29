import React, { useContext } from 'react';
import './profiles.css';
import '../../colors.css';
import Button from '@material-ui/core/Button';
import MailModal from './MailModal';
import { AppContext } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const ProfileButton = ({ role, ownerID, email, userID, name, pet }) => {
  const history = useHistory();
  const { currentUser, user } = useContext(AppContext);

  return (
    <div id="profile-btn-wrapper">
      <MailModal
        role={role}
        email={email}
        name={name}
        userID={userID}
        pet={pet}
      />

      {ownerID ? (
        <Button
          onClick={() => history.push(`/userprofile/${ownerID}`)}
          variant="contained"
          id="btn2"
          style={{ backgroundColor: 'black' }}
        >
          Owner
        </Button>
      ) : (
        <Button
          onClick={() => {
            if (!currentUser || !user) {
              return swal(
                'Oops!',
                'You must be logged in to do this.',
                'error'
              );
            } else {
              history.push('/videochat');
            }
          }}
          variant="contained"
          id="btn2"
          style={{ backgroundColor: 'black' }}
        >
          Video Call
        </Button>
      )}
    </div>
  );
};

export default ProfileButton;
