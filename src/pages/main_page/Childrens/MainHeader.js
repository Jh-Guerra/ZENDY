import React, { useState } from "react";
import ChatAvatar from "pages/main_page/Components/ChatAvatar";
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid, TextField, Typography } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import ModalRecomendarUsuario from "components/Modals/ModalRecomendarUsuario";
// import ModalEndChat from "components/Modals/ModalEndChat";
import ModalAcceptChat from "components/Modals/ModalAcceptChat";
import ModalChatDetail from "components/Modals/ModalChatDetail";
import ModalAddToConversation from "components/Modals/ModalAddToConversation";

const MainHeader = props => {

  React.useEffect(() => {

  }, []);

  const [showAcceptChat, setShowAcceptChat] = useState(false);
  const [showRecomendarUsuario, setShowRecomendarUsuario] = useState(false)
  const [showChatDetail, setShowChatDetail] = useState(false);
  const [showAddToConversation, setShowAddToConversation] = useState(false);

  const handleAcceptChat = () => {
      setShowAcceptChat(true);
  }

  const handleClose = () => {
      setShowAcceptChat(false);
  }

  const handleRecomendarUsuario = () => {
    setShowRecomendarUsuario(true);
  }

  const handleChatDetail = () => {
    setShowChatDetail(true);
  }

  const handleAddToConversation = () => {
    setShowAddToConversation(true);
  }

  return (
    <Grid container className="chat-header">    
      <Grid container className="chat-header-content">
        <Grid item xs={6} onClick={handleChatDetail} style={{cursor:"pointer"}}>       
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
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),disableUnderline: true
              }}
            />
            <IconButton onClick={handleRecomendarUsuario} className="chat-header-button"><PersonAddIcon style={{ fontSize: 35 }} /></IconButton>
            <IconButton onClick={handleAddToConversation} className="chat-header-button"><PersonAddIcon style={{ fontSize: 35 }} /></IconButton>
            <IconButton onClick={handleAcceptChat} className="chat-header-button"><MoreVertIcon style={{ fontSize: 40 }} /></IconButton>
          </Grid>              
        </Grid>
      </Grid>
      <ModalRecomendarUsuario
        open={showRecomendarUsuario} 
        handleClose={() => { setShowRecomendarUsuario(false); }}
      />
      {showAcceptChat &&
        <ModalAcceptChat 
          open={showAcceptChat} 
          handleClose={handleClose}
        />
      } 
      {showChatDetail &&
        <ModalChatDetail 
          open={showChatDetail} 
          onClose={()=> { setShowChatDetail(false) }}
        />
      }   
      <ModalAddToConversation 
        open={showAddToConversation}
        handleClose={() => { setShowAddToConversation (false); }}
      />
    </Grid>
  );

}

export default MainHeader;
