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
import { updateStatus, findUserStatusOn } from 'services/actions/UserAction';
import { onHideSnackBar } from 'services/actions/CustomAction';
import Echo from "laravel-echo";
import config from "config/Config";

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
      this.props.dispatch(setCurrentSession(session));
      window.addEventListener('beforeunload', this.alertUser)
      window.addEventListener('unload', this.handleEndConcert)
      window.addEventListener("beforeunload", this.props.dispatch(findUserStatusOn(session.user.id, '1')));
    }

    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: config.pusherAppKey,
      cluster: config.pusherCluster,
      encrypted: true,
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: false,
      auth: {
        headers: {
            Authorization: 'Bearer ' + `${JSON.parse(localStorage.getItem('session')).token || ''}`
        },
      }
    });
  }
  componentWillUnmount() {

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
