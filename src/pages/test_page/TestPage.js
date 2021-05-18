import React, { Component } from 'react';
import BasePage from 'components/BasePage';

class TestPage extends Component {
  _isMounted = false
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount(){
    this._isMounted = true
    // await this.props.dispatch(getIncomingOrders());}
  }

  componentWillUnmount() {
    this._isMounted =false
  }

  render() {
    return (
      <BasePage
        privateHeader={null}
      >
        <p>
          Incoming View
        </p>
      </BasePage>
    );
  }
}

export default TestPage;
