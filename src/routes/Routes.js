import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import ThemeSettings from '../components/ThemeSettings/ThemeSettings';
import PrivateRoute from './PrivateRoute';
import LoginPage from 'pages/loginPage/LoginPage';
import ErrorInfoPage from 'pages/error/ErrorInfoPage';
import ReportPage from 'pages/report/ReportPage';
import MainPage from 'pages/main_page/MainPage';
import UsersPage from 'pages/users_page/UsersPage';
import CompaniesPage from 'pages/companies_page/CompaniesPage';
import BlankPage from 'pages/test_page/BlankPage';
import PageNotFound from 'pages/PageNotFound';
import { checkPermission, getSessionInfo } from 'utils/common';
import EntryQueryPage from 'pages/entry_query_page/EntryQueryPage';
import NotificationsPage from 'pages/notifications_page/NotificationsPage';
import ChatHistoryPage from 'pages/chat_history_page/ChatHistoryPage';
import CompanyUsersPage from 'pages/users_page/CompanyUsersPage';
import CompaniesHDPage from 'pages/companies_page/CompaniesHDPage';

const Routes = (props) => {
  const session = getSessionInfo();

  return(  
    <ThemeSettings>
      <BrowserRouter> 
        <Switch style={{height:"100%"}}>

          <Route exact path="/" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/blank"} /> )}/>
          <Route exact path="/login" render={(props) => ( <LoginPage {...props} appTarget={"Dispatch"} routePush={"/blank"} /> )}/>
          
          <PrivateRoute exact path="/error-info/:errorId" {...props} component={ErrorInfoPage} />
          <PrivateRoute exact path="/report" {...props} component={ReportPage} />

          {checkPermission(session, "showUserCrud") && (
            <PrivateRoute exact path="/usuarios" {...props} component={UsersPage} />
          )}
           {checkPermission(session, "showCompanyUsersCrud") && (
            <PrivateRoute exact path="/usuarios-empresa" {...props} component={CompanyUsersPage} />
          )}
          {checkPermission(session, "showCompanyCrud") && (
            <PrivateRoute exact path="/empresas" {...props} component={CompaniesPage} />
          )}
          {checkPermission(session, "showCompanyCrud") && (
            <PrivateRoute exact path="/mesas-de-ayuda" {...props} component={CompaniesHDPage} />
          )}

          <PrivateRoute exact path="/inicio" {...props} component={BlankPage} />

          <PrivateRoute exact path="/chats/:chatId" {...props} component={MainPage} />
          <PrivateRoute exact path="/chat-historial/:chatId" {...props} component={ChatHistoryPage} />

          <PrivateRoute exact path="/consultas/:entryQueryId" {...props} component={EntryQueryPage} />
          <PrivateRoute exact path="/consultas/:entryQueryId/recomendacion" {...props} component={EntryQueryPage} />

          <PrivateRoute exact path="/notificaciones/:notificationId" {...props} component={NotificationsPage} />
          <PrivateRoute exact path="/notificaciones/:notificationId/viewed" {...props} component={NotificationsPage} />

          <Route path="/no-encontrado" component={PageNotFound}/>
          <Redirect from="*" to="/no-encontrado" />
          
        </Switch>
      
      </BrowserRouter>
    </ThemeSettings>
  )
};

export default Routes;
