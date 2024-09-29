import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Menu,
  MenuItem,
  AppBar,
  IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from '@material-ui/icons/Home';

import SearchIcon from '@material-ui/icons/Search';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountBox from '@material-ui/icons/AccountBox';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { AppContext } from '../context/AppContext';
import './nav.css';
import '../colors.css';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  drawer: {
    width: 250
  }
});

const Nav = () => {
  const { currentUser } = useContext(AppContext);

  //Required for conditional logic to hide Navbar on homepage
  const { pathname } = useLocation();

  // Materials UI Library to handle Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Materials UI Library to handle Drawer
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });
  const anchor = 'left';
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const iconList = (text) => {
    switch (text) {
      case 'Home':
        return <HomeIcon />;
      case 'Search':
        return <SearchIcon />;
      case 'Location Search':
        return <PersonPinCircleIcon />;
      // case 'About Us':
      //   return <InfoIcon />;
      default:
        return null;
    }
  };

  const viewLink = currentUser ? { display: 'flex' } : { display: 'none' };

  const list = (anchor) => (
    <>
      <Toolbar />
      <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {[
            { text: 'Home', link: '/' },
            { text: 'Search', link: '/search' },
            { text: 'Location Search', link: '/map', secure: true },
            {}
          ].map((el) => (
            <ListItem
              button
              key={el.text}
              to={el.link}
              component={Link}
              style={el.secure && viewLink}
            >
              <ListItemIcon className="drawer-icon">
                {iconList(el.text)}
              </ListItemIcon>
              <ListItemText className="drawer-text" primary={el.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );

  // Wrapped Navbar Return in If/Else so that it does NOT display on landing page
  if (pathname !== '/') {
    return (
      <>
        <AppBar id="navbar">
          <Toolbar>
            <div id="logo-home-container">
              <IconButton
                className="logo"
                edge="start"
                aria-label="menu"
                to="/"
                component={Link}
              ></IconButton>

              <IconButton
                className="navbar-menu"
                onClick={toggleDrawer(anchor, true)}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </div>

            <div id="login-icon">
              <IconButton
                className="navbar-menu"
                edge="end"
                color="inherit"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="account-menu"
                style={{ zIndex: '1500' }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {currentUser ? (
                  <span>
                    <MenuItem
                      style={{ color: 'black' }}
                      component={Link}
                      to="/account"
                      onClick={handleClose}
                    >
                      <EditIcon />
                      &nbsp; Account
                    </MenuItem>
                    <MenuItem
                      style={{ color: 'black' }}
                      component={Link}
                      to={`/userprofile/${currentUser && currentUser._id}`}
                      onClick={handleClose}
                    >
                      <FaceIcon />
                      &nbsp; Profile
                    </MenuItem>
                  </span>
                ) : (
                  <span>
                    <MenuItem
                      component={Link}
                      to="/login"
                      onClick={handleClose}
                    >
                      <AccountBox /> &nbsp;Login
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/register"
                      onClick={handleClose}
                    >
                      <AccountCircle /> &nbsp;Sign Up
                    </MenuItem>
                  </span>
                )}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          className={classes.drawer}
        >
          {list(anchor)}
        </Drawer>
      </>
    );
  } else {
    return null;
  }
};

export default Nav;
