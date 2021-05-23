import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import ChatHeader from "pages/chat_page/Childrens/ChatHeader";
import ChatBody from "pages/chat_page/Childrens/ChatBody";
import ChatFooter from "pages/chat_page/Childrens/ChatFooter";
class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount(){

  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <Grid container style={{position:'sticky', width:'100%', height:'calc(100vh)'}}>
        <Grid item xs={12}>
          <ChatHeader/>
        </Grid>
        <Grid item xs={12}>
          <ChatBody/>
        </Grid>
        <Grid item xs={12}>
          <ChatFooter/>
        </Grid>
      </Grid>
    );
  }
}

export default ChatPage;
