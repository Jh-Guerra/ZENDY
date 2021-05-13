import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Routes } from 'routes';
import { connect } from 'react-redux';
import 'assets/styles/zendy-app.css';
// import 'assets/styles/zendy-app.scss';
import { StylesProvider } from '@material-ui/core/styles';
import { setCurrentSession, logOut, renewToken } from 'services/actions/AuthAction';
import CustomSnackbar from 'components/CustomSnackbar';
import CustomBackdrop from 'components/CustomBackdrop';
import moment from 'moment'
import { withRouter } from 'react-router-dom';

class ZendyAppShell extends Component {

  constructor(props) {
    super(props);

    this.state = {
      snackbar: false,
      message: "",
      alertType: "info",
      backdrop: false
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

    if (user && user.accessToken) {
      this.props.dispatch(setCurrentSession(JSON.parse(localStorage.getItem('user'))));
      // this.props.dispatch(renewToken());
    }
  }

  componentDidUpdate(prevProps) {
    
  }

  showSnackbar = (open, message, alertType) => {
    this.setState({
      snackbar: open || false,
      message: message || "",
      alertType: alertType || "info"
    })
  }

  showBackdrop = (open) => {
    this.setState({
      backdrop: open
    });
  }

  render() {
    const { snackbar, message, alertType, backdrop } = this.state;

    return (
      <StylesProvider injectFirst>
        <div className="App">
          <Helmet>
            <title>Zendy</title>
          </Helmet>
          <Routes 
            {...this.props}
            showSnackbar={this.showSnackbar}
            showBackdrop={this.showBackdrop}
          />
          <CustomSnackbar
            open={snackbar || false}
            message={message || ""}
            alertType={alertType || "info"}
            onClose={(event, reason) => {
              this.showSnackbar(false, "", "");
            }}
            duration={3000}
          />
          <CustomBackdrop 
            open={backdrop || false} 
          />
        </div>
      </StylesProvider>
    )
  }
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(ZendyAppShell));
