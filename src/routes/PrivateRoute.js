import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CssBaseline, makeStyles } from '@material-ui/core';

import MiniDrawer from 'components/mini_drawer/MiniDrawer';
import { getSessionInfo } from 'utils/common';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
}))

const PrivateRoute = ({ component:Component, ...rest }) => {
  const classes = useStyles();

  const session = getSessionInfo();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MiniDrawer {...rest}/> 
      <Route
        {...rest}
        render={props => ( session ? (
          <div style={{width: "100%"}}> <Component {...props} {...rest} /> </div>
        ) : <Redirect to="/" />)}
      />
    </div>
  );
}

export default PrivateRoute;