import React, { Component, createRef } from "react";
import ChatAvatar from "pages/chat_page/Components/ChatAvatar";
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid, TextField } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ChatHeader = props => {

  React.useEffect(() => {

  }, []);

  return (
    <Grid container className="chat-header">
      <div className="main__chatcontent">
        <div className="chat-header-content">
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={2} style={{display:"flex"}}>
                  <div className="chat-header-avatar">
                    <ChatAvatar
                      isOnline="active"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
                      imgClassName="avatar-header"
                    />
                  </div>
                </Grid>
                <Grid item xs={6} className="chat-header-name">
                  <div>
                    <p>Homero Simpons</p>
                  </div>
                  <div>
                      <span className="online-icon"/>
                      <span className="online-spane">En línea...</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container className="chat-header-buttons">
                <TextField className="search_wrap" type="text" placeholder="Buscar..."/>
                <IconButton className="chat-header-button"><PersonAddIcon style={{ fontSize: 35 }} /></IconButton>
                <IconButton className="chat-header-button"><MoreVertIcon style={{ fontSize: 40 }} /></IconButton>
              </Grid>              
            </Grid>
          </Grid>
        </div>
      </div>
    </Grid>
  );

}

export default ChatHeader;
