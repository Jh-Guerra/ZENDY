import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import ZendyIcon from '../../assets/images/Zendy-icon.jpg'
import Echo from "laravel-echo";
window.Pusher = require('pusher-js')

class BlankPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: 'ZENDY_PUSHER_KEY',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true
    })
    window.Echo.channel('home3').listen('sendMessage', (e) => {
      console.log("event",e)
    })
  }

  render() {
    return (
      <BasePage privateHeader={null}>
        <div className="blank-container">
          <img src={ZendyIcon} />
          <p>Servicio de Mensajeria</p>
        </div>
      </BasePage>
    );
  }
}

export default BlankPage;
