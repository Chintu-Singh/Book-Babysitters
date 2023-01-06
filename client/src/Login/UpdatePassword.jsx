import React, { useState } from 'react';
import './login.css';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';

const UpdatePassword = ({ history }) => {
  const [password, setPassword] = useState(null);

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.password !== password.confirmPassword) {
      return swal('Error!', 'Passwords must match!', 'error');
    }
    if (password.password.length < 6) {
      return swal(
        'Error',
        'Password must be longer than 6 characters!',
        'error'
      );
    }
    if (password.password.toLowerCase().includes('password')) {
      return swal(
        'Error',
        'Password cannot contain the word password',
        'error'
      );
    }
    if (!password.password || !password.confirmPassword) {
      return swal(
        'Wait!',
        'You must enter a password and confirmation',
        'error'
      );
    }
    try {
      await axios.put(
        '/password',
        { password: password.password },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
      return swal(
        'Wait!',
        'Something went wrong! Make sure you are entering the password correctly.',
        'error'
      );
    }
    history.push('/login');
  };

  return (
    <div id="login-container">
      <Card
        elevation={3}
        className="gradient-border"
        style={{ maxWidth: '600px' }}
      >
        <CardContent className="card-inside">
          <Typography variant="h2" className="header-card-title">
            Update Password
          </Typography>
          <Typography
            variant="body1"
            component="div"
            style={{
              padding: '20px 50px 0'
            }}
          >
            Enter your new password here. Passwords must be at least six
            characters and cannot contain the phrase 'password'.
          </Typography>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            style={{ width: '100%' }}
          >
            <TextField
              className="text-field"
              variant="outlined"
              label="password"
              type="password"
              name="password"
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <TextField
              className="text-field"
              variant="outlined"
              label="confirm password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{
                alignSelf: 'center',
                marginTop: '30px',
                width: '70%',
                backgroundColor: 'black'
              }}
              className="card-btn"
            >
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePassword;
