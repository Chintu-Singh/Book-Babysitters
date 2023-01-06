import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Typography, TextField } from '@material-ui/core';
import { AppContext } from '../../context/AppContext';
import swal from 'sweetalert';
import axios from 'axios';

function getModalStyle() {
  const top = 30;
  const left = 30;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '20px'
  }
}));

const MailModal = ({ role, name, email, pet, userID }) => {
  const { currentUser, user } = useContext(AppContext);
  const [formData, setFormData] = useState();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (!currentUser || !user) {
      return swal('Oops!', 'You must be logged in to do this.', 'error');
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'user') {
      axios
        .post(
          `/user/me/message?userID=${userID}&name=${name}&toEmail=${email}`,
          formData,
          { withCredentials: true }
        )
        .then((response) => {
          swal('Success!', 'Message sent', 'success');
        })
        .catch((error) => {
          console.log(error);
          swal('Oops!', 'Something went wrong...', 'error');
        });
    } else {
      axios
        .post(`/pets/${pet._id}/email`, formData, {
          withCredentials: true
        })
        .then((response) => {
          swal('Success!', 'Message sent', 'success');
        })
        .catch((error) => {
          console.log(error);
          swal('Oops!', 'Something went wrong...', 'error');
        });
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h3">Contact Me</Typography>
      <form onSubmit={handleSubmit}>
        {role !== 'user' ? (
          <>
            <Typography
              variant="body1"
              style={{
                width: '100%',
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >
              Want to share this pet's information with someone? Fill out this
              form and send it off!
            </Typography>
            <TextField
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              variant="outlined"
              name="toEmail"
              label="Recipient's Email"
              type="text"
            />
          </>
        ) : (
          <Typography
            variant="body1"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Want to send this user a message? Fill out this form and send it
            off!
          </Typography>
        )}
        <TextField
          style={{ marginTop: '20px' }}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          variant="outlined"
          name="subject"
          label="Subject"
          type="text"
        />
        <TextField
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          style={{ marginTop: '20px' }}
          variant="outlined"
          name="message"
          multiline
          rows="5"
          label="type your message here..."
        />
        <Button
          type="submit"
          className="card-btn"
          style={{ marginTop: '20px', backgroundColor: 'black' }}
        >
          Send
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Button
        variant="contained"
        style={{ backgroundColor: 'black' }}
        id="btn1"
        onClick={handleOpen}
      >
        {role === 'user' ? 'Contact' : 'Share'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="email form"
        aria-describedby="email form"
      >
        {body}
      </Modal>
    </>
  );
};

export default MailModal;
