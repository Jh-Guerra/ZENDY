import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import zen from '../../assets/images/Zendy-icon.jpg'

class BlankPages extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <BasePage privateHeader={null}>
        
        <div className="container">
          <img img src={zen} />
          <p>Servicio de Mensajeria</p>
        </div>
      </BasePage>
    );
  }
}

export default BlankPages;
