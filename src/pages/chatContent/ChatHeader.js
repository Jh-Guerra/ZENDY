import React, { Component, useState, createRef, useEffect } from "react";

import "./chatContent.css";
import "pages/chatList/chatList.css";
import Avatar from "pages/chatList/Avatar";
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid, TextField } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

 class ChatHeader extends Component {
  messagesEndRef = createRef(null);

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        if (this.state.msg != "") {
          this.chatItms.push({
            key: 1,
            type: "",
            msg: this.state.msg,
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          });
          this.setState({ chat: [...this.chatItms] });
         
          this.setState({ msg: "" });
        }
      }
    });
    
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    return (

<Grid container>
      <div className="main__chatcontent">
        <div className="content__header">
          <Grid item xs={4}>
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
             
            </div>
          </div>
          </Grid>
        <Grid item xs={4} className="current-chatting-user" alignItems= "flex-start"  alignContent="flex-start">
          <p>Homero Simpons</p>
        </Grid>
        <Grid item xs={4} spacing={4} className="chatList__search" alignItems= "center"  alignContent="center" >  
          <TextField className="search_wrap" type="text" placeholder="Search Here"/>
          <IconButton><PersonAddIcon className="addPerson" style={{ fontSize: 35 }} /></IconButton>
          <IconButton><MoreVertIcon className="addPerson" style={{ fontSize: 40 }} /></IconButton>    
        </Grid>
      </div>
    </div>
</Grid>
    );
  }
}
export default ChatHeader
