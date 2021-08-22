import React, { Component } from 'react';
import zen from '../assets/images/zendy-icon.jpg'
import BasePage from 'components/BasePage';

/* const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#303e7a'
    }
  })); */

class PageNotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
    
  }

  render() {
    return (

        <div className="notfound-page">
          <img img src={zen} />
          <p>Página no encontrada</p>    
        </div>
    );
  }
}

export default PageNotFound;