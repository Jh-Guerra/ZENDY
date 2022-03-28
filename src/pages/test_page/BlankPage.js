import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import ZendyIcon from '../../assets/images/ZendyIcon.jpg'
import LogoZendy from 'assets/images/Zendy-logo.png';
import Echo from "laravel-echo";
import { listUsersOnline } from 'services/actions/UserAction';
window.Pusher = require('pusher-js')

class BlankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <BasePage privateHeader={null}>
        <div className="blank-container" style={{userSelect:"none"}}>
          <img width="100" height="100" alt="zendy" src={LogoZendy} />
          {/* <p>Servicio de Mensajeria</p> */}
        </div>
      </BasePage>
    );
  }
}

export default BlankPage;
