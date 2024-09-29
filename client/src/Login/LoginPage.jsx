import React, { useState, useContext } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from '@material-ui/core';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';

const LoginPage = ({ history }) => {
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: formData
    })
      .then(({ data }) => {
        sessionStorage.setItem('user', data.data);
        setCurrentUser(data.data);
        if (data) {
          history.push('/account');
        }
      })
      .catch((error) => {
        console.log(error);
        swal(
          'Oops!',
          'Problem logging in; check your email and password',
          'error'
        );
      });
  };

  return (
    <div id="login-container">
      <Card elevation={3} className="gradient-border">
        <CardContent className="card-inside">
          <Typography variant="h2" className="header-card-title">
            Login
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="text-field"
              variant="outlined"
              id="email"
              label="Enter your Email"
              type="email"
              name="email"
            />
            <TextField
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="text-field"
              variant="outlined"
              id="password"
              label="Enter your password"
              type="password"
              name="password"
            />
            <Typography variant="button">
              <Link to="/password">Forgot password?</Link>
              <br />
              <Link to="/register">Create Account?</Link>
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
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
