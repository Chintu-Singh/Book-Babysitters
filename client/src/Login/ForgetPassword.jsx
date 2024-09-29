import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert';

const ForgetPassword = ({ history }) => {
  const [formData, setFormData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!formData) {
      return swal('Wait!', 'Please enter an email', 'error');
    }
    axios
      .get(`/password?email=${formData}`)
      .then((res) => {
        form.reset();
        return swal(
          'Success!',
          'Thank you! Please check your email for the reset link',
          'success'
        );
      })
      .catch((error) => {
        console.log(error);
        return swal(
          'Wait!',
          "Something went wrong! Please make sure you're entering the correct email",
          'error'
        );
      });
  };

  return (
    <div id="login-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside">
          <Typography variant="h2" className="header-card-title">
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            component="div"
            style={{ padding: '20px 50px 0' }}
          >
            Enter your email here to receive a message with a link to reset your
            password.
          </Typography>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            style={{ width: '100%' }}
          >
            <TextField
              onChange={(e) => setFormData(e.target.value)}
              className="text-field"
              variant="outlined"
              label="email"
              type="email"
              name="email"
            />
            <Typography variant="button">
              <Link to="/login">Login?</Link>
              <br />
              <Link to="/register">Register?</Link>
            </Typography>
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
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;
