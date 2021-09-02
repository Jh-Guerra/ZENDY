import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import MainHeader from "pages/main_page/Childrens/MainHeader";
import MainBody from "pages/main_page/Childrens/MainBody";
import MainFooter from "pages/main_page/Childrens/MainFooter";
import { showBackdrop } from 'services/actions/CustomAction';
import { findChat } from 'services/actions/ChatAction';
class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatdata: {}
    };
  }

  async componentDidMount(){

  }

  onListChatData = (chatId) => {
    this.props.dispatch(showBackdrop(true));
    this.props.dispatch(findChat(chatId)).then(res => {
      this.setState({ chatdata: res.chat || {} });
      this.props.dispatch(showBackdrop(false));
    }).catch(err => this.props.dispatch(showBackdrop(false)));
  };

  componentWillUnmount() {
    
  }

  render() {
    const { chatdata } = this.state;
    return (
      <Grid container style={{height:'100vh'}}>
        <Grid item xs={12} style={{height:'13vh'}}>
          <MainHeader
            onListChatData={this.onListChatData}
            chatdata={chatdata}
          />
        </Grid>
        <Grid item xs={12} style={{height:'13vh'}}>
          <MainBody/>
        </Grid>
        <Grid item xs={12} style={{height:'74vh'}}>
          <MainFooter/>
        </Grid>
      </Grid>
    );
  }
}

export default MainPage;
