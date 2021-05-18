import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import ChatHeader from "pages/chatContent/ChatHeader";
import ChatBody from "pages/chatContent/ChatBody";
import ChatFooter from "pages/chatContent/ChatFooter";
import "./App.css";
class ChatPage extends Component {
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
    <div className="_main">
      <Grid>
          <Grid>
            <ChatHeader/>
          </Grid>
          <Grid>
              <ChatBody/>
          </Grid>
          <Grid>
          <ChatFooter/>
          </Grid>
      </Grid>
    </div>
      </BasePage>
    );
  }
}

export default ChatPage;
