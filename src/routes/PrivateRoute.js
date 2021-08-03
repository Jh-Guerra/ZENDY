import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CssBaseline, makeStyles } from '@material-ui/core';

import MiniDrawer from 'components/mini_drawer/MiniDrawer';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
}))

const PrivateRoute = ({ component:Component, ...rest }) => {
  const classes = useStyles();

  const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MiniDrawer {...rest}/> 
      <Route
        {...rest}
        render={props => ( user ? (
          <div style={{width: "100%"}}> <Component {...props} {...rest} /> </div>
        ) : <Redirect to="/" />)}
      />
    </div>
  );
}

export default PrivateRoute;