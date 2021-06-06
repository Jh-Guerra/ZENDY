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
      <Grid container style={{height:'100%'}}>
        <Grid item xs={12} style={{height:'10%'}}>
          <ChatHeader/>
        </Grid>
        <Grid item xs={12} style={{height:'80%'}}>
          <ChatBody/>
        </Grid>
        <Grid item xs={12} style={{height:'10%'}}>
          <ChatFooter/>
        </Grid>
      </Grid>
    );
  }
}

export default ChatPage;
