import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  TestPage,
} from 'pages';

import ThemeSettings from '../components/ThemeSettings';
import PrivateRoute from './PrivateRoute';
import LoginPage from 'pages/LoginPage';

const Routes = (props) => {
  return(  
    <ThemeSettings>
      <Switch>
        <Route exact path="/" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/test-view"} /> )}/>
        <Route exact path="/login" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/test-view"} /> )}/>

        <PrivateRoute exact path="/test-view" {...props}>
          <TestPage/>
        </PrivateRoute>

      </Switch>
    </ThemeSettings>
  )
};

export default Routes;
