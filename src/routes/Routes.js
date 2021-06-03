import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  ChatPage
} from 'pages';

import ThemeSettings from '../components/ThemeSettings';
import PrivateRoute from './PrivateRoute';
import LoginPage from 'pages/loginPage/LoginPage';
import ReportedBugPage from 'pages/error/ReportedBugPage';

const Routes = (props) => {
  return(  
    <ThemeSettings>
      <Switch>
        <Route exact path="/" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/test-view"} /> )}/>
        <Route exact path="/login" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/test-view"} /> )}/>
        <PrivateRoute exact path="/test-view" {...props}>
          <ChatPage/>
        </PrivateRoute>
        <PrivateRoute exact path="/reportedBugPage" {...props}>
          <ReportedBugPage/>
        </PrivateRoute>

      </Switch>
    </ThemeSettings>
  )
};

export default Routes;
