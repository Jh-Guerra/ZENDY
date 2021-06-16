import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ThemeSettings from '../components/ThemeSettings';
import PrivateRoute from './PrivateRoute';
import LoginPage from 'pages/loginPage/LoginPage';
import ErrorInfoPage from 'pages/error/ErrorInfoPage';
import ReportPage from 'pages/report/ReportPage';
import MainPage from 'pages/main_page/MainPage';
import UsersPage from 'pages/users_page/UsersPage';

const Routes = (props) => {
  return(  
    <ThemeSettings>
      <Switch style={{height:"100%"}}>
        <Route exact path="/" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/test-view"} /> )}/>
        <Route exact path="/login" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/test-view"} /> )}/>

        <PrivateRoute exact path="/test-view" {...props}>
          <MainPage/>
        </PrivateRoute>

        <PrivateRoute exact path="/error-info" {...props}>
          <ErrorInfoPage/>
        </PrivateRoute>

        <PrivateRoute exact path="/report" {...props}>
          <ReportPage/>
        </PrivateRoute>

        <PrivateRoute exact path="/users" {...props}>
          <UsersPage/>
        </PrivateRoute>

      </Switch>
    </ThemeSettings>
  )
};

export default Routes;
