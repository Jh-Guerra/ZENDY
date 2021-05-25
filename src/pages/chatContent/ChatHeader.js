import React, { Component, createRef } from "react";
import ChatAvatar from "pages/chatList/ChatAvatar";
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid, TextField } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ChatHeader = props => {

  React.useEffect(() => {

  }, []);

  return (
    <Grid container>
      <div className="main__chatcontent">
        <div className="content__header">
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={2}>
                  <div className="blocks">
                    <div className="current-chatting-user">
                      <ChatAvatar
                        isOnline="active"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="current-chatting-user">
                    <p>Homero Simpons</p>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                <TextField className="search_wrap" type="text" placeholder="Buscar..."/>
                <IconButton><PersonAddIcon className="addPerson" style={{ fontSize: 35 }} /></IconButton>
                <IconButton><MoreVertIcon className="addPerson" style={{ fontSize: 40 }} /></IconButton>
              </Grid>              
            </Grid>
          </Grid>
        </div>
      </div>
    </Grid>
  );

}

export default ChatHeader;