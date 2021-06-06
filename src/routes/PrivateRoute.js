import React from 'react';
import { Route } from 'react-router-dom';
import { CssBaseline, makeStyles } from '@material-ui/core';

import MiniDrawer from 'components/mini_drawer/MiniDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
}))

const PrivateRoute = ({ children, ...rest }) => {
  const classes = useStyles();
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
        return React.cloneElement(child, {...rest});
    }
    return child;
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MiniDrawer {...rest}/> 
      <Route
        {...rest}
        render={({ location }) => childrenWithProps}
      /> 
      
    </div>
  );
}

export default PrivateRoute;