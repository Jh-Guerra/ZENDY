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
      // this.props.dispatch(renewToken());
    }
  }

  componentDidUpdate(prevProps) {
    
  }

  render() {
    const { custom={} } = this.props;
    const { snackbar={}, backdrop={} } = custom;

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
                onClose={(event, reason) => {
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
