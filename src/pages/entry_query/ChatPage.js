import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import ChatHeader from "pages/entry_query/Childrens/ChatHeader";
import ChatBody from "pages/entry_query/Childrens/ChatBody";
import ChatFooter from "pages/entry_query/Childrens/ChatFooter";
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
        <Grid item xs={12} style={{height:'10%', minHeight: '110px'}}>
          <ChatHeader/>
        </Grid>
        <Grid item xs={12} style={{height:'70%'}}>
          <ChatBody/>
        </Grid>
        <Grid item xs={12} style={{height:'10%', minHeight: '110px'}}>
          <ChatFooter/>
        </Grid>
      </Grid>
    );
  }
}

export default ChatPage;
