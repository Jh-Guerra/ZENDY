import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import ZendyIcon from '../../assets/images/ZendyIcon.jpg'
import LogoZendy from 'assets/images/Zendy-logo.png';
import Echo from "laravel-echo";
import { listUsersOnline } from 'services/actions/UserAction';
import CustomModal from 'components/Modals/common/CustomModal';
window.Pusher = require('pusher-js')

class BlankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  async componentDidMount() {
    if(this.props.location.state==1)
    {
      this.setState({ open: true });
    }
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <BasePage privateHeader={null}>
        <div className="blank-container" style={{userSelect:"none"}}>
          <img width="100" height="100" alt="zendy" src={LogoZendy} />
          {/* <p>Servicio de Mensajeria</p> */}
        </div>
        <CustomModal
            customModal={'ModalCarrusel'}
            open={this.state.open}
            handleClose={() => this.handleClose()}
          />
      </BasePage>
    );
  }
}

export default BlankPage;
