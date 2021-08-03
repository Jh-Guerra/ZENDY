import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import ZendyIcon from '../../assets/images/Zendy-icon.jpg'

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
        <div className="blank-container">
          <img src={ZendyIcon} />
          <p>Servicio de Mensajeria</p>
        </div>
      </BasePage>
    );
  }
}

export default BlankPage;
