import React, { Component } from 'react';
import ZendyIcon from '../assets/images/ZendyIcon.jpg'
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
          <img img src={ZendyIcon} />
          <p>Página no encontrada</p>    
        </div>
    );
  }
}

export default PageNotFound;