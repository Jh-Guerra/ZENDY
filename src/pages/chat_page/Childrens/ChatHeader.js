import React, { Component, createRef, useState } from "react";
import ChatAvatar from "pages/chat_page/Components/ChatAvatar";
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid, TextField } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ModalNotification from "components/Modals/ModalNotification";
import ModalAcceptChat from "components/Modals/ModalAcceptChat";
import ModalNewChat from "components/Modals/ModalNewChat";

const ChatHeader = props => {

  React.useEffect(() => {

  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  return (
    <Grid container className="chat-header">
      <Grid container className="chat-header-content">
        <Grid item xs={6}>
          <Grid container style={{height:"100%", padding:"0px 10px"}}>
            <Grid item xs={2} style={{display:"flex"}}>
              <div className="chat-header-avatar">
                <ChatAvatar
                  isOnline="active"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
                  imgClassName="avatar-header"
                />
              </div>
            </Grid>
            <Grid item xs={8} className="chat-header-name">
              <div>
                <p>Homero Simpons</p>
              </div>
              <div>
                  <span className="online-icon"/>
                  <span className="online-spane">En línea</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={6}>
          <Grid container className="chat-header-buttons">
            <TextField className="chatList__search search_wrap" 
              style={{paddingLeft: '20px'}}
              type="text"
              placeholder="Buscar..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" InputProps={{ disableUnderline: true }}>
                    <SearchIcon />
                  </InputAdornment>
                ),disableUnderline: true
              }}
            />
            <IconButton onClick={handleClickOpen} className="chat-header-button"><PersonAddIcon style={{ fontSize: 35 }} /></IconButton>
            <IconButton className="chat-header-button"><MoreVertIcon style={{ fontSize: 40 }} /></IconButton>
          </Grid>              
        </Grid>
      </Grid>
      <ModalNewChat 
        open={open} 
        handleClose={handleClose}
      />
    </Grid>
  );

}

export default ChatHeader;
