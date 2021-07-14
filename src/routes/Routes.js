import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import ThemeSettings from '../components/ThemeSettings';
import PrivateRoute from './PrivateRoute';
import LoginPage from 'pages/loginPage/LoginPage';
import ErrorInfoPage from 'pages/error/ErrorInfoPage';
import ReportPage from 'pages/report/ReportPage';
import MainPage from 'pages/main_page/MainPage';
import UsersPage from 'pages/users_page/UsersPage';
import CompaniesPage from 'pages/companies_page/CompaniesPage';
import BlankPage from 'pages/test_page/BlankPage';
import PageNotFound from 'pages/PageNotFound';

const Routes = (props) => {
  return(  
    <ThemeSettings>
      <BrowserRouter> 
        <Switch style={{height:"100%"}}>

          <Route exact path="/" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/blank"} /> )}/>
          <Route exact path="/login" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/blank"} /> )}/>

          <PrivateRoute exact path="/test-view" {...props} component={MainPage} />
          <PrivateRoute exact path="/error-info" {...props} component={ErrorInfoPage} />
          <PrivateRoute exact path="/report" {...props} component={ReportPage} />
          <PrivateRoute exact path="/usuarios" {...props} component={UsersPage} />
          <PrivateRoute exact path="/empresas" {...props} component={CompaniesPage} />
          <PrivateRoute exact path="/inicio" {...props} component={BlankPage} />

          <Route path="/no-encontrado" component={PageNotFound}/>
          <Redirect from="*" to="/no-encontrado" />
          
        </Switch>
      
      </BrowserRouter>
    </ThemeSettings>
  )
};

export default Routes;
