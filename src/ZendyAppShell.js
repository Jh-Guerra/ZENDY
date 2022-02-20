import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Routes } from 'routes';
import { connect } from 'react-redux';
import 'assets/styles/zendy-app.css';
import 'assets/styles/zendy-app.scss';
import { StylesProvider } from '@material-ui/core/styles';
import { setCurrentSession, logOut, renewToken } from 'services/actions/AuthAction';
import CustomSnackbar from 'components/CustomSnackbar';
import CustomBackdrop from 'components/CustomBackdrop';
import moment from 'moment'
import { withRouter } from 'react-router-dom';
import 'date-fns';
import { getSessionInfo } from 'utils/common';
import { updateStatus } from 'services/actions/UserAction';
import { onHideSnackBar } from 'services/actions/CustomAction';
import Echo from "laravel-echo";
import config from "config/Config";
import { listActiveChats } from 'services/actions/ChatAction';
import { useHistory } from 'react-router-dom';
import {findUser } from 'services/actions/UserAction';

window.Pusher = require('pusher-js');

class ZendyAppShell extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    const session = getSessionInfo();

    let dt = moment();
    dt.subtract(dt.parseZone().utcOffset(), 'minutes');

    if (session && session.token) {
      const userId = session && session.user && session.user.id || "";
      this.props.dispatch(findUser(userId)).then(res => {
        if(res && res.deleted == 1){
          this.props.dispatch(logOut());
          window.location.href = config.commonHost;
        }
      });
      this.props.dispatch(setCurrentSession(session));
      window.addEventListener('beforeunload', this.alertUser)
      window.addEventListener('unload', this.handleEndConcert)
    }

    if(localStorage.getItem('session')){
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: config.pusherAppKey,
        wsHost: window.location.hostname,
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        cluster: config.pusherCluster,
        encrypted: false,
        // enabledTransports: ['ws'],
        // authEndpoint: config.api + 'broadcasting/auth',
        auth: {
          headers: {
              Authorization: 'Bearer ' + `${JSON.parse(localStorage.getItem('session')).token || ''}`
          },
        }
      });

      const user = session && session.user || {};
      window.Echo.private("user." + user.id).listen('notificationMessage', (e) => {
        (e.chatId == localStorage.getItem("currentChatId")) && this.props.history.push("/inicio");
        this.props.dispatch(listActiveChats("", "Vigente", false))
      })
    }
    
  }
  componentWillUnmount() {
    const session = getSessionInfo();
    if (session && session.token) {
      const userId = session && session.user && session.user.id || "";
      this.props.dispatch(findUser(userId)).then(res => {
        if(res && res.deleted){
          this.props.dispatch(logOut());
          window.location.href = config.commonHost;
        }
      });
    }
    window.removeEventListener('beforeunload', this.alertUser)
    window.removeEventListener('unload', this.handleEndConcert)

  }

  componentDidUpdate(prevProps) {
  }

 alertUser = e => {
  e.preventDefault()
  e.returnValue = ''
  this.handleEndConcert()
}
 handleEndConcert = async () => {
  const session = getSessionInfo();
  await this.props.dispatch(updateStatus(session.user.id, '0'))
}

  render() {
    const { custom={} } = this.props;
    const { snackbar={}, backdrop={} } = custom;
    const isMain = this.useIsMainWindow;
    return (
      <StylesProvider injectFirst>
        <div className="App" style={{height:"100%"}}>
          <Helmet>
            <title>Zendy</title>
          </Helmet>
          <Routes 
            {...this.props}
          />
          {
            snackbar.show && (
              <CustomSnackbar
                open={snackbar.show || false}
                message={snackbar.message || ""}
                alertType={snackbar.alertType || "info"}
                onClose={(event, reason) => {this.props.dispatch(onHideSnackBar())
                }}
                duration={5000}
              />
            )
          }
          <CustomBackdrop 
            open={backdrop.show || false} 
          />
        </div>
      </StylesProvider>
    )
  }
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(ZendyAppShell));
