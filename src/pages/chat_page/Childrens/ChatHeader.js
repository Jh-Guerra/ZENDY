import React, { Component, createRef, useState } from "react";
import ChatAvatar from "pages/chat_page/Components/ChatAvatar";
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid, TextField, Typography } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ModalAcceptChat from "components/Modals/ModalAcceptChat";
import ModalChatDetail from "components/Modals/ModalChatDetail";

const ChatHeader = props => {

  React.useEffect(() => {

  }, []);

  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handleClickDetail = () => {
    setOpenDetail(true);
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
            <Grid onClick={handleClickDetail} item xs={8} className="chat-header-name">                                                        
              <div>
                <Typography style={{fontSize:"25px", color:"white"}}>Homero Simpons</Typography>
              </div>
              <Typography style={{fontSize:"20px", color:"white", marginLeft:"30px"}}> <span className="online-icon"/>En linea</Typography>                 
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
              {open &&
                <ModalAcceptChat 
                  open={open} 
                  handleClose={handleClose}
                />
              } 
              {openDetail &&
                <ModalChatDetail 
                  open={openDetail} 
                  onClose={()=> { setOpenDetail(false) }}
                />
              }   
          </Grid>              
        </Grid>
      </Grid>   
    </Grid>
  );

}

export default ChatHeader;
