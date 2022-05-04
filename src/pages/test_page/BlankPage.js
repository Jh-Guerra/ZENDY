import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import ZendyIcon from '../../assets/images/ZendyIcon.jpg'
import LogoZendy from 'assets/images/Zendy-logo.png';
import Echo from "laravel-echo";
import { listUsersOnline } from 'services/actions/UserAction';
import CustomModal from 'components/Modals/common/CustomModal';
import { getSessionInfo } from "utils/common";
window.Pusher = require('pusher-js')

class BlankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  async componentDidMount() {
    // console.log(this.props.countRx.pos)
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

  // const session = getSessionInfo();

  // console.log(session.user)

  render() {
    const session = getSessionInfo();
    const modal = []
    if(session.user.statusModal == 1 && this.props.countRx.pos==0){
      if(session.user.idRole == 3 || session.user.idRole == 5){
        modal.push(
          <CustomModal
            customModal={'ModalEntryQuery'}
            open={this.state.open}
            statusActive={true}
            handleClose={() => this.handleClose()}
          />
        )
      }
    }

    return (
      <BasePage privateHeader={null}>
        <div className="blank-container" style={{userSelect:"none"}}>
          <img width="100" height="100" alt="zendy" src={LogoZendy} />
          {/* <p>Servicio de Mensajeria</p> */}
        </div>
        {modal}        
      </BasePage>
    );
  }
}

export default BlankPage;
