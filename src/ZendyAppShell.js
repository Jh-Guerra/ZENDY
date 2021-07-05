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

class ZendyAppShell extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));

    let dt = moment();
    dt.subtract(dt.parseZone().utcOffset(), 'minutes');

    // if (user === null || user.expirationTime < dt.valueOf()) {
    //   this.props.dispatch(logOut());
    //   this.props.history.push('/');
    //   return;
    // }

    if (user && user.token) {
      this.props.dispatch(setCurrentSession(JSON.parse(localStorage.getItem('user'))));
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
